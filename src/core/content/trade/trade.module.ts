import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { Trade } from './trade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade])],
  providers: [TradeService],
  controllers: [TradeController]
})
export class TradeModule {}
