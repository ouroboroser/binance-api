import { Module } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { MarketDataController } from './market-data.controller';
import { BinanceModule } from '../providers/binance/binance.module';
import { Trade, TradeSchema } from '../database/schemas/trade.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    BinanceModule,
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
  ],
  providers: [MarketDataService],
  controllers: [MarketDataController],
})
export class MarketDataModule {}
