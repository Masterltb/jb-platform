import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CombatService {
  constructor(private prisma: PrismaService) {}

  async getAllBosses() {
    const bosses = await this.prisma.bossState.findMany();
    return bosses.map(b => ({
      ...b,
      drops: typeof b.drops === 'string' ? JSON.parse(b.drops) : b.drops,
    }));
  }

  // Server-side Combat Calculation adhering to FEAT-007
  async executeAttack(userId: string, cardId: string, bossId: string) {
    const card = await this.prisma.characterCard.findFirst({
      where: { id: cardId, userId },
      include: { equippedItems: true },
    });
    if (!card) throw new NotFoundException('Không tìm thấy nhân vật tham chiến!');

    const boss = await this.prisma.bossState.findFirst({
      where: { OR: [{ id: bossId }, { code: bossId }] },
    });
    if (!boss) throw new NotFoundException('Không tìm thấy Boss chiến trường!');

    // 1. Calculate Effective ATK including equipped items
    let totalAtk = card.atk;
    let totalCritRate = card.critRate;
    let totalCritDmg = card.critDamage;

    for (const item of card.equippedItems) {
      const stats = typeof item.stats === 'string' ? JSON.parse(item.stats) : item.stats;
      if (stats.atk) totalAtk += stats.atk;
      if (stats.critRate) totalCritRate += stats.critRate;
      if (stats.critDamage) totalCritDmg += stats.critDamage;
    }

    // 2. DEF Mitigation formula: 1000 / (1000 + Boss DEF)
    const mitigation = 1000 / (1000 + boss.def);
    const isStaggered = boss.isStaggered;
    const isCrit = isStaggered || Math.random() < Math.min(0.95, totalCritRate);
    const critMultiplier = isCrit ? (1.5 + totalCritDmg) : 1.0;
    const staggerMultiplier = isStaggered ? 1.5 : 1.0;
    const variance = 0.95 + Math.random() * 0.1;

    const damage = Math.round(totalAtk * mitigation * critMultiplier * staggerMultiplier * variance);
    const breakDmg = Math.round(totalAtk * 0.35 + 200);

    // 3. Update Boss Stance & HP
    let newBreak = Math.max(0, boss.currentBreak - breakDmg);
    let newStaggered = isStaggered;
    if (newBreak === 0 && !isStaggered) {
      newStaggered = true;
    }

    const newHp = Math.max(0, boss.currentHp - damage);
    const isPhase2 = newHp <= boss.maxHp * 0.5 && newHp > 0;
    const isVictory = newHp === 0;

    // Persist Boss damage to DB
    const updatedBoss = await this.prisma.bossState.update({
      where: { id: boss.id },
      data: {
        currentHp: newHp,
        currentBreak: newBreak,
        isStaggered: newStaggered,
        phase: isPhase2 ? 2 : 1,
      },
    });

    // 4. Calculate Boss Counter Attack on hero frontline
    const bossMitigation = 1000 / (1000 + card.def);
    const bossCounterDmg = Math.round(boss.atk * bossMitigation * 0.6);

    // If victory, award gold and diamonds to user
    let victoryRewards = null;
    if (isVictory) {
      const goldReward = 50000;
      const diamondReward = 300;
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          gold: { increment: BigInt(goldReward) },
          diamonds: { increment: diamondReward },
        },
      });
      victoryRewards = { gold: goldReward, diamonds: diamondReward, itemsCount: 4 };

      // Reset boss for next fight
      await this.prisma.bossState.update({
        where: { id: boss.id },
        data: {
          currentHp: boss.maxHp,
          currentBreak: boss.maxBreak,
          isStaggered: false,
          phase: 1,
        },
      });
    }

    return {
      damage,
      isCrit,
      isStaggered: newStaggered,
      breakDamageDealt: breakDmg,
      bossRemainingHp: newHp,
      bossRemainingBreak: newBreak,
      bossMaxHp: boss.maxHp,
      bossMaxBreak: boss.maxBreak,
      bossCounterDmg,
      isPhase2,
      isVictory,
      victoryRewards,
    };
  }
}
