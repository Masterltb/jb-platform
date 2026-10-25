import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AfkService {
  constructor(private prisma: PrismaService) {}

  async getAfkStatus(userId: string) {
    const session = await this.prisma.afkSession.findUnique({
      where: { userId },
    });
    if (!session) {
      return { elapsedSeconds: 0, accumulatedGold: 0, accumulatedDiamonds: 0 };
    }

    const now = Date.now();
    const elapsedSeconds = Math.max(0, Math.floor((now - session.lastClaimedAt.getTime()) / 1000));
    const accumulatedGold = elapsedSeconds * session.rateGoldPerSec;
    const accumulatedDiamonds = Math.floor(elapsedSeconds / 60);

    return {
      elapsedSeconds,
      accumulatedGold,
      accumulatedDiamonds,
      rateGoldPerSec: session.rateGoldPerSec,
      rateExpPerSec: session.rateExpPerSec,
      lastClaimedAt: session.lastClaimedAt,
    };
  }

  // Server-side AFK Claim adhering to CONSTITUTION.md
  async claimAfkRewards(userId: string) {
    const session = await this.prisma.afkSession.findUnique({
      where: { userId },
    });
    if (!session) throw new NotFoundException('Không tìm thấy phiên treo máy AFK!');

    const now = Date.now();
    const elapsedSeconds = Math.max(0, Math.floor((now - session.lastClaimedAt.getTime()) / 1000));
    const goldEarned = elapsedSeconds * session.rateGoldPerSec;
    const diamondsEarned = Math.floor(elapsedSeconds / 60);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const [updatedUser, updatedSession] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          gold: user.gold + BigInt(goldEarned),
          diamonds: user.diamonds + diamondsEarned,
        },
      }),
      this.prisma.afkSession.update({
        where: { userId },
        data: { lastClaimedAt: new Date() },
      }),
    ]);

    return {
      success: true,
      elapsedSeconds,
      claimedGold: goldEarned,
      claimedDiamonds: diamondsEarned,
      newTotalGold: Number(updatedUser.gold),
      newTotalDiamonds: updatedUser.diamonds,
    };
  }
}
