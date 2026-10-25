import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const NEXT_RARITY: Record<string, string | null> = {
  Common: 'Fine',
  Fine: 'Rare',
  Rare: 'Epic',
  Epic: 'Legendary',
  Legendary: 'Mythic',
  Mythic: null,
  Sovereign: null,
};

const DISMANTLE_YIELD: Record<string, { gold: number; stones: number; diamonds: number }> = {
  Common: { gold: 100, stones: 1, diamonds: 0 },
  Fine: { gold: 300, stones: 3, diamonds: 0 },
  Rare: { gold: 1000, stones: 8, diamonds: 0 },
  Epic: { gold: 3500, stones: 20, diamonds: 10 },
  Legendary: { gold: 12000, stones: 50, diamonds: 50 },
  Mythic: { gold: 40000, stones: 150, diamonds: 200 },
  Sovereign: { gold: 0, stones: 0, diamonds: 0 },
};

const RANK_COLORS: Record<string, string> = {
  Sovereign: '#ff007f',
  Mythic: '#ef4444',
  Legendary: '#f59e0b',
  Epic: '#a855f7',
  Rare: '#3b82f6',
  Fine: '#10b981',
  Common: '#94a3b8',
};

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // Enhance Item (+1 to +20)
  async enhanceItem(userId: string, itemId: string) {
    const item = await this.prisma.equipmentItem.findFirst({
      where: { id: itemId, userId },
    });
    if (!item) throw new NotFoundException('Không tìm thấy trang bị!');

    if (item.enhanceLevel >= 20) {
      throw new BadRequestException('Trang bị này đã đạt cấp cường hóa tối đa (+20)!');
    }

    const costGold = (item.enhanceLevel + 1) * 8000;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.gold < BigInt(costGold)) {
      throw new BadRequestException(`Không đủ Vàng! Cần ${costGold.toLocaleString()} 🪙 để cường hóa.`);
    }

    const currentStats = typeof item.stats === 'string' ? JSON.parse(item.stats) : item.stats;
    const newStats = {
      ...currentStats,
      atk: currentStats.atk ? Math.round(currentStats.atk * 1.1) : undefined,
      hp: currentStats.hp ? Math.round(currentStats.hp * 1.1) : undefined,
      def: currentStats.def ? Math.round(currentStats.def * 1.1) : undefined,
    };

    // Atomic transaction: deduct gold + update item
    const [updatedUser, updatedItem] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { gold: user.gold - BigInt(costGold) },
      }),
      this.prisma.equipmentItem.update({
        where: { id: itemId },
        data: {
          enhanceLevel: item.enhanceLevel + 1,
          stats: JSON.stringify(newStats),
        },
      }),
      this.prisma.transactionAudit.create({
        data: {
          idempotencyKey: `enhance_${itemId}_${item.enhanceLevel + 1}_${Date.now()}`,
          userId,
          actionType: 'ENHANCE',
          status: 'SUCCESS',
          details: JSON.stringify({ itemId, costGold, newLevel: item.enhanceLevel + 1 }),
        },
      }),
    ]);

    return {
      success: true,
      remainingGold: Number(updatedUser.gold),
      item: {
        ...updatedItem,
        stats: newStats,
      },
    };
  }

  // Fuse 3 items into 1 higher-rank item according to FEAT-007
  async fuseItems(userId: string, itemIds: string[]) {
    if (itemIds.length !== 3) {
      throw new BadRequestException('Cần chính xác 3 trang bị để tiến hành Dung Luyện Ghép!');
    }

    const items = await this.prisma.equipmentItem.findMany({
      where: { id: { in: itemIds }, userId, characterCardId: null },
    });
    if (items.length !== 3) {
      throw new BadRequestException('Không tìm thấy đủ 3 trang bị hợp lệ trong túi đồ!');
    }

    const targetRank = NEXT_RARITY[items[0].rank];
    if (!targetRank || !items.every(i => i.rank === items[0].rank)) {
      throw new BadRequestException('Cả 3 trang bị phải cùng phẩm cấp và có thể dung luyện lên cấp kế tiếp!');
    }

    const fusionCost = 5000;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.gold < BigInt(fusionCost)) {
      throw new BadRequestException(`Không đủ Vàng! Cần ${fusionCost.toLocaleString()} 🪙 để dung luyện.`);
    }

    const baseSlot = items[0].slot;
    const fusedItemStats = {
      atk: baseSlot === 'Weapon' ? (targetRank === 'Fine' ? 280 : targetRank === 'Rare' ? 680 : targetRank === 'Epic' ? 1450 : targetRank === 'Legendary' ? 3200 : 6800) : undefined,
      hp: baseSlot !== 'Weapon' ? (targetRank === 'Fine' ? 1000 : targetRank === 'Rare' ? 2500 : targetRank === 'Epic' ? 5500 : targetRank === 'Legendary' ? 12000 : 24000) : undefined,
      def: baseSlot !== 'Weapon' ? (targetRank === 'Fine' ? 80 : targetRank === 'Rare' ? 220 : targetRank === 'Epic' ? 520 : targetRank === 'Legendary' ? 1100 : 2200) : undefined,
      critRate: targetRank === 'Legendary' || targetRank === 'Mythic' ? 0.15 : 0.05,
    };

    const newName = `${targetRank === 'Fine' ? 'Tinh Chế' : targetRank === 'Rare' ? 'Huyền Thiết' : targetRank === 'Epic' ? 'Đột Biến Cyber' : targetRank === 'Legendary' ? 'Thần Binh Titan' : 'Lôi Thần Phá Không'} ${items[0].name.split(': ').pop() || items[0].name}`;

    const [updatedUser, _, createdItem] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { gold: user.gold - BigInt(fusionCost) },
      }),
      this.prisma.equipmentItem.deleteMany({
        where: { id: { in: itemIds } },
      }),
      this.prisma.equipmentItem.create({
        data: {
          userId,
          name: newName,
          slot: baseSlot,
          rank: targetRank,
          level: 20,
          maxLevel: targetRank === 'Mythic' ? 80 : targetRank === 'Legendary' ? 60 : 50,
          enhanceLevel: 0,
          stats: JSON.stringify(fusedItemStats),
          image: items[0].image,
          colorHex: RANK_COLORS[targetRank] || '#3b82f6',
        },
      }),
    ]);

    return {
      success: true,
      remainingGold: Number(updatedUser.gold),
      createdItem: {
        ...createdItem,
        stats: fusedItemStats,
      },
    };
  }

  // Dismantle Items for Gold, Diamonds, and Stones
  async dismantleItems(userId: string, itemIds: string[]) {
    if (!itemIds || itemIds.length === 0) {
      throw new BadRequestException('Vui lòng chọn ít nhất 1 trang bị để phân rã!');
    }

    const items = await this.prisma.equipmentItem.findMany({
      where: { id: { in: itemIds }, userId, characterCardId: null },
    });
    if (items.length === 0) {
      throw new NotFoundException('Không tìm thấy trang bị nào để phân rã!');
    }

    if (items.some(i => i.rank === 'Sovereign')) {
      throw new BadRequestException('Thần Khí Độc Tôn 1-of-1 Server không thể bị phân rã!');
    }

    let totalGold = 0;
    let totalDiamonds = 0;
    let totalStones = 0;

    for (const item of items) {
      const y = DISMANTLE_YIELD[item.rank] || { gold: 100, stones: 1, diamonds: 0 };
      totalGold += y.gold;
      totalDiamonds += y.diamonds;
      totalStones += y.stones;
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const [updatedUser] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          gold: user.gold + BigInt(totalGold),
          diamonds: user.diamonds + totalDiamonds,
        },
      }),
      this.prisma.equipmentItem.deleteMany({
        where: { id: { in: itemIds } },
      }),
      this.prisma.transactionAudit.create({
        data: {
          idempotencyKey: `dismantle_${Date.now()}_${Math.random()}`,
          userId,
          actionType: 'DISMANTLE',
          status: 'SUCCESS',
          details: JSON.stringify({ itemCount: items.length, totalGold, totalDiamonds, totalStones }),
        },
      }),
    ]);

    return {
      success: true,
      dismantledCount: items.length,
      refundedGold: totalGold,
      refundedDiamonds: totalDiamonds,
      refundedStones: totalStones,
      totalGold: Number(updatedUser.gold),
      totalDiamonds: updatedUser.diamonds,
    };
  }
}
