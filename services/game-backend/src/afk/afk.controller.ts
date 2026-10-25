import { Controller, Get, Post, Headers } from '@nestjs/common';
import { AfkService } from './afk.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/afk')
export class AfkController {
  constructor(
    private afkService: AfkService,
    private prisma: PrismaService,
  ) {}

  private async getUserId(headerId?: string): Promise<string> {
    if (headerId) return headerId;
    const defaultUser = await this.prisma.user.findFirst();
    return defaultUser?.id || '';
  }

  @Get('status')
  async getStatus(@Headers('x-user-id') userId?: string) {
    const finalUserId = await this.getUserId(userId);
    return this.afkService.getAfkStatus(finalUserId);
  }

  @Post('claim')
  async claimRewards(@Headers('x-user-id') userId?: string) {
    const finalUserId = await this.getUserId(userId);
    return this.afkService.claimAfkRewards(finalUserId);
  }
}
