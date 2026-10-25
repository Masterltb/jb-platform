import { Controller, Post, Body, Headers } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/inventory')
export class InventoryController {
  constructor(
    private inventoryService: InventoryService,
    private prisma: PrismaService,
  ) {}

  private async getUserId(headerId?: string): Promise<string> {
    if (headerId) return headerId;
    const defaultUser = await this.prisma.user.findFirst();
    return defaultUser?.id || '';
  }

  @Post('enhance')
  async enhanceItem(
    @Body() body: { itemId: string },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = await this.getUserId(userId);
    return this.inventoryService.enhanceItem(finalUserId, body.itemId);
  }

  @Post('fuse')
  async fuseItems(
    @Body() body: { itemIds: string[] },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = await this.getUserId(userId);
    return this.inventoryService.fuseItems(finalUserId, body.itemIds);
  }

  @Post('dismantle')
  async dismantleItems(
    @Body() body: { itemIds: string[] },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = await this.getUserId(userId);
    return this.inventoryService.dismantleItems(finalUserId, body.itemIds);
  }
}
