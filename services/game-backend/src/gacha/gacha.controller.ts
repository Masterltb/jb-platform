import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/gacha')
export class GachaController {
  constructor(
    private gachaService: GachaService,
    private prisma: PrismaService,
  ) {}

  private async getUserId(headerId?: string): Promise<string> {
    if (headerId) return headerId;
    const defaultUser = await this.prisma.user.findFirst();
    return defaultUser?.id || '';
  }

  @Get('jackpot')
  async getJackpot() {
    return this.gachaService.getJackpotPool();
  }

  @Post('open')
  async openChest(
    @Body() body: { chestId: string; count?: number; idempotencyKey?: string },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = await this.getUserId(userId);
    return this.gachaService.openChest(
      finalUserId,
      body.chestId,
      body.count || 1,
      body.idempotencyKey,
    );
  }
}
