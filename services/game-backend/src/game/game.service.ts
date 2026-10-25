import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  // Get full game state for user (Squad, 6-slots per hero, Inventory, Active Boss, Jackpot)
  async getGameState(userId?: string) {
    // If no userId provided, fallback to the seeded master account
    let targetUser = null;
    if (userId) {
      targetUser = await this.prisma.user.findUnique({ where: { id: userId } });
    }
    if (!targetUser) {
      targetUser = await this.prisma.user.findFirst();
    }
    if (!targetUser) {
      throw new NotFoundException('Không tìm thấy tài khoản người chơi trong cơ sở dữ liệu!');
    }

    const actualUserId = targetUser.id;

    // Fetch Cards & Equipped items
    const cards = await this.prisma.characterCard.findMany({
      where: { userId: actualUserId },
      include: { equippedItems: true },
    });

    // Fetch Inventory (items not currently equipped)
    const inventory = await this.prisma.equipmentItem.findMany({
      where: { userId: actualUserId, characterCardId: null },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch Active Boss
    const activeBoss = await this.prisma.bossState.findFirst({
      where: { code: 'tier_6' },
    });

    // Fetch Jackpot Pool
    const jackpot = await this.prisma.gachaJackpotPool.findFirst();

    // Fetch AFK session
    const afkSession = await this.prisma.afkSession.findUnique({
      where: { userId: actualUserId },
    });

    // Format cards with equipped items map
    const formattedCards = cards.map(c => {
      const equippedMap: Record<string, any> = {};
      for (const item of c.equippedItems) {
        equippedMap[item.slot] = {
          ...item,
          stats: typeof item.stats === 'string' ? JSON.parse(item.stats) : item.stats,
          exclusivePerk: item.exclusivePerk ? (typeof item.exclusivePerk === 'string' ? JSON.parse(item.exclusivePerk) : item.exclusivePerk) : undefined,
        };
      }

      // Calculate balanced CP according to FEAT-014
      const moons = (c as any).moons || 0;
      const suns = (c as any).suns || 0;
      const ascensionTier = (c as any).ascensionTier || (suns > 0 ? 12 + suns : moons > 0 ? 6 + moons : c.stars);
      const tierRealm = (c as any).tierRealm || (suns > 0 ? 'Sun' : moons > 0 ? 'Moon' : 'Star');

      let equipCp = 0;
      for (const eq of Object.values(equippedMap)) {
        if (eq && eq.stats) {
          equipCp += (eq.stats.atk || 0) * 3.5 + (eq.stats.hp || 0) * 0.3 + (eq.stats.def || 0) * 2.5 + 12000;
        }
      }

      let totalCombatPower: number;
      if (c.rank === 'Sovereign') {
        totalCombatPower = 1850000;
      } else {
        const rawCp = Math.round(
          c.currentHp * 1.0 +
          c.atk * 4.0 +
          c.def * 2.5 +
          c.critRate * 20000 +
          Math.max(0, c.critDamage - 1) * 15000 +
          c.styleBonus * 60
        );
        totalCombatPower = rawCp + equipCp;
      }

      return {
        id: c.id,
        templateId: c.templateId,
        name: c.name,
        role: c.role,
        position: c.position,
        rank: c.rank,
        stars: c.stars,
        moons,
        suns,
        ascensionTier,
        tierRealm,
        isActiveSquad: (c as any).isActiveSquad ?? true,
        level: c.level,
        currentHp: c.currentHp,
        maxHp: c.maxHp,
        currentShield: c.currentShield,
        atk: c.atk,
        def: c.def,
        critRate: c.critRate,
        critDamage: c.critDamage,
        styleBonus: c.styleBonus,
        isAwakened: c.isAwakened,
        avatarImage: c.avatarImage,
        avatarIcon: c.avatarIcon,
        avatarBg: c.avatarBg,
        signatureSkill: typeof c.signatureSkill === 'string' ? JSON.parse(c.signatureSkill) : c.signatureSkill,
        equippedItems: equippedMap,
        totalCombatPower,
      };
    });

    const formattedInventory = inventory.map(item => ({
      ...item,
      stats: typeof item.stats === 'string' ? JSON.parse(item.stats) : item.stats,
      exclusivePerk: item.exclusivePerk ? (typeof item.exclusivePerk === 'string' ? JSON.parse(item.exclusivePerk) : item.exclusivePerk) : undefined,
    }));

    return {
      user: {
        id: targetUser.id,
        username: targetUser.username,
        email: targetUser.email,
        gold: Number(targetUser.gold),
        diamonds: targetUser.diamonds,
        energy: targetUser.energy,
        maxEnergy: targetUser.maxEnergy,
        totalCp: Number(targetUser.totalCp),
      },
      squad: formattedCards,
      inventory: formattedInventory,
      boss: activeBoss
        ? {
            id: activeBoss.id,
            code: activeBoss.code,
            name: activeBoss.name,
            title: activeBoss.title,
            level: activeBoss.level,
            maxHp: activeBoss.maxHp,
            currentHp: activeBoss.currentHp,
            maxBreak: activeBoss.maxBreak,
            currentBreak: activeBoss.currentBreak,
            def: activeBoss.def,
            atk: activeBoss.atk,
            isStaggered: activeBoss.isStaggered,
            phase: activeBoss.phase,
            image: activeBoss.image,
            drops: typeof activeBoss.drops === 'string' ? JSON.parse(activeBoss.drops) : activeBoss.drops,
          }
        : null,
      jackpot: jackpot
        ? {
            goldPool: Number(jackpot.goldPool),
            diamondPool: jackpot.diamondPool,
            lastWinner: jackpot.lastWinner,
          }
        : { goldPool: 15480000, diamondPool: 68500 },
      afk: afkSession
        ? {
            lastClaimedAt: afkSession.lastClaimedAt,
            rateGoldPerSec: afkSession.rateGoldPerSec,
            rateExpPerSec: afkSession.rateExpPerSec,
          }
        : null,
    };
  }

  // Equip Item on Card
  async equipItem(userId: string, cardId: string, slot: string, itemId: string) {
    const card = await this.prisma.characterCard.findFirst({
      where: { id: cardId, userId },
      include: { equippedItems: true },
    });
    if (!card) throw new NotFoundException('Không tìm thấy nhân vật!');

    const item = await this.prisma.equipmentItem.findFirst({
      where: { id: itemId, userId },
    });
    if (!item) throw new NotFoundException('Không tìm thấy trang bị!');

    if (item.slot !== slot) {
      throw new BadRequestException(`Trang bị này thuộc ô ${item.slot}, không thể gắn vào ô ${slot}!`);
    }

    // Unequip currently equipped item in this slot (if any)
    const currentInSlot = card.equippedItems.find(i => i.slot === slot);
    if (currentInSlot) {
      await this.prisma.equipmentItem.update({
        where: { id: currentInSlot.id },
        data: { characterCardId: null },
      });
    }

    // Equip the new item
    const updatedItem = await this.prisma.equipmentItem.update({
      where: { id: itemId },
      data: { characterCardId: cardId },
    });

    return {
      success: true,
      equippedItem: {
        ...updatedItem,
        stats: typeof updatedItem.stats === 'string' ? JSON.parse(updatedItem.stats) : updatedItem.stats,
      },
    };
  }

  // Unequip Item
  async unequipItem(userId: string, cardId: string, slot: string) {
    const item = await this.prisma.equipmentItem.findFirst({
      where: { characterCardId: cardId, slot, userId },
    });
    if (!item) throw new NotFoundException('Không có trang bị nào ở vị trí này!');

    await this.prisma.equipmentItem.update({
      where: { id: item.id },
      data: { characterCardId: null },
    });

    return { success: true, unequippedItemId: item.id };
  }
}
