import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { CombatService } from './combat.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/combat')
export class CombatController {
  constructor(
    private combatService: CombatService,
    private prisma: PrismaService,
  ) {}

  private async getUserId(headerId?: string): Promise<string> {
    if (headerId) return headerId;
    const defaultUser = await this.prisma.user.findFirst();
    return defaultUser?.id || '';
  }

  @Get('bosses')
  async getAllBosses() {
    return this.combatService.getAllBosses();
  }

  @Post('attack')
  async executeAttack(
    @Body() body: { cardId: string; bossId: string },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = await this.getUserId(userId);
    return this.combatService.executeAttack(finalUserId, body.cardId, body.bossId);
  }
}
