import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('state')
  async getGameState(@Headers('x-user-id') userId?: string) {
    return this.gameService.getGameState(userId);
  }

  @Post('equip')
  async equipItem(
    @Body() body: { cardId: string; slot: string; itemId: string },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = userId || (await this.gameService.getGameState()).user.id;
    return this.gameService.equipItem(finalUserId, body.cardId, body.slot, body.itemId);
  }

  @Post('unequip')
  async unequipItem(
    @Body() body: { cardId: string; slot: string },
    @Headers('x-user-id') userId?: string,
  ) {
    const finalUserId = userId || (await this.gameService.getGameState()).user.id;
    return this.gameService.unequipItem(finalUserId, body.cardId, body.slot);
  }
}
