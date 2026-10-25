import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { InventoryModule } from './inventory/inventory.module';
import { CombatModule } from './combat/combat.module';
import { GachaModule } from './gacha/gacha.module';
import { AfkModule } from './afk/afk.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    GameModule,
    InventoryModule,
    CombatModule,
    GachaModule,
    AfkModule,
  ],
})
export class AppModule {}
