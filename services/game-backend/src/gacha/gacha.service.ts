import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ChestConfig {
  id: string;
  name: string;
  currency: 'GOLD' | 'DIAMONDS';
  cost: number;
  jackpotChance: number;
}

const CHEST_CONFIGS: Record<string, ChestConfig> = {
  chest_bronze: { id: 'chest_bronze', name: 'Hòm Đồng', currency: 'GOLD', cost: 50000, jackpotChance: 0.001 },
  chest_silver: { id: 'chest_silver', name: 'Hòm Bạc', currency: 'DIAMONDS', cost: 150, jackpotChance: 0.01 },
  chest_gold: { id: 'chest_gold', name: 'Rương Vàng', currency: 'DIAMONDS', cost: 500, jackpotChance: 0.05 },
  chest_mythic: { id: 'chest_mythic', name: 'Hòm Lôi Thần', currency: 'DIAMONDS', cost: 1200, jackpotChance: 0.15 },
  chest_sovereign: { id: 'chest_sovereign', name: 'Bảo Hạp Hắc Long', currency: 'DIAMONDS', cost: 3000, jackpotChance: 0.35 },
};

const SAMPLE_TEMPLATES = [
  { name: 'Gậy Bida Phản Quang Titan', slot: 'Weapon', rank: 'Legendary', image: '/images/items/item_legendary_weapon.png', colorHex: '#F59E0B' },
  { name: 'Súng Phun Lửa Bio Đột Biến', slot: 'Weapon', rank: 'Epic', image: '/images/items/item_bm_flamethrower.png', colorHex: '#A855F7' },
  { name: 'Rolex Cyber Lộ Máy Vàng 24K', slot: 'Accessory', rank: 'Legendary', image: '/images/items/item_bm_gold_rolex.png', colorHex: '#F59E0B' },
  { name: 'Vali Vàng Thỏi 9999 Ngầm', slot: 'Accessory', rank: 'Epic', image: '/images/items/item_bm_gold_bars.png', colorHex: '#A855F7' },
  { name: 'Ống Tuýp Sắt Dạ Quang Phố Đêm', slot: 'Weapon', rank: 'Rare', image: '/images/items/item_rare_weapon.png', colorHex: '#3B82F6' },
  { name: 'Kính Râm LED Phong Cách Cyber', slot: 'Accessory', rank: 'Rare', image: '/images/items/item_rare_accessory.png', colorHex: '#3B82F6' },
  { name: 'Dao Găm Xoay Phản Quang', slot: 'Weapon', rank: 'Fine', image: '/images/items/item_fine_weapon.png', colorHex: '#10B981' },
  { name: 'Gậy Gỗ Tập Luyện Phố Hẻm', slot: 'Weapon', rank: 'Common', image: '/images/items/item_common_weapon.png', colorHex: '#94A3B8' },
];

@Injectable()
export class GachaService {
  constructor(private prisma: PrismaService) {}

  async getJackpotPool() {
    const pool = await this.prisma.gachaJackpotPool.findFirst();
    if (!pool) return { goldPool: 15480000, diamondPool: 68500 };
    return {
      goldPool: Number(pool.goldPool),
      diamondPool: pool.diamondPool,
      lastWinner: pool.lastWinner,
    };
  }

  // Idempotent Chest Opening with ACID Transaction
  async openChest(userId: string, chestId: string, count = 1, idempotencyKey?: string) {
    const config = CHEST_CONFIGS[chestId] || CHEST_CONFIGS.chest_gold;
    const totalCost = config.cost * count;

    // Idempotency check
    if (idempotencyKey) {
      const existingTx = await this.prisma.transactionAudit.findUnique({
        where: { idempotencyKey },
      });
      if (existingTx) {
        return JSON.parse(existingTx.details);
      }
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản người chơi!');

    if (config.currency === 'DIAMONDS') {
      if (user.diamonds < totalCost) {
        throw new BadRequestException(`Không đủ Kim Cương! Cần ${totalCost.toLocaleString()} 💎 để mở.`);
      }
    } else {
      if (user.gold < BigInt(totalCost)) {
        throw new BadRequestException(`Không đủ Vàng! Cần ${totalCost.toLocaleString()} 🪙 để mở.`);
      }
    }

    // Determine pulled items
    const pulledItemsData: any[] = [];
    let isJackpot = false;

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let template: any;

      if (rand < config.jackpotChance * 0.1 || (chestId === 'chest_sovereign' && rand < 0.25)) {
        template = {
          name: 'Thần Khí Độc Tôn: Hắc Long Thần Cơ Neon',
          slot: 'Weapon',
          rank: 'Sovereign',
          serverLimit: '1_OF_1',
          image: '/images/items/item_sovereign_weapon.png',
          colorHex: '#FF007F',
          stats: { atk: 3500, critRate: 0.35, critDamage: 0.75 },
        };
        isJackpot = true;
      } else if (rand < 0.3) {
        template = SAMPLE_TEMPLATES[0]; // Legendary
      } else if (rand < 0.6) {
        template = SAMPLE_TEMPLATES[1]; // Epic
      } else if (rand < 0.85) {
        template = SAMPLE_TEMPLATES[4]; // Rare
      } else {
        template = SAMPLE_TEMPLATES[6]; // Fine
      }

      pulledItemsData.push({
        userId,
        name: template.name,
        slot: template.slot,
        rank: template.rank,
        serverLimit: template.serverLimit || null,
        level: 1,
        maxLevel: 50,
        enhanceLevel: 0,
        stats: JSON.stringify(template.stats || { atk: 300, hp: 500 }),
        image: template.image,
        colorHex: template.colorHex,
      });
    }

    // Execute atomic transaction
    const [updatedUser, ...createdItems] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          gold: config.currency === 'GOLD' ? user.gold - BigInt(totalCost) : user.gold,
          diamonds: config.currency === 'DIAMONDS' ? user.diamonds - totalCost : user.diamonds,
        },
      }),
      ...pulledItemsData.map(data => this.prisma.equipmentItem.create({ data })),
      this.prisma.gachaJackpotPool.updateMany({
        data: {
          goldPool: { increment: BigInt(count * 500) },
          diamondPool: { increment: count * 2 },
        },
      }),
    ]);

    const formattedResults = createdItems.map((item: any) => ({
      ...item,
      stats: typeof item.stats === 'string' ? JSON.parse(item.stats) : item.stats,
    }));

    const responsePayload = {
      success: true,
      isJackpot,
      pulledItems: formattedResults,
      remainingGold: Number(updatedUser.gold),
      remainingDiamonds: updatedUser.diamonds,
    };

    if (idempotencyKey) {
      await this.prisma.transactionAudit.create({
        data: {
          idempotencyKey,
          userId,
          actionType: 'GACHA_OPEN',
          status: 'SUCCESS',
          details: JSON.stringify(responsePayload),
        },
      });
    }

    return responsePayload;
  }
}
