import { Module } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { HttpModule } from '@nestjs/axios';

const BINANCE_API = 'https://api.binance.com';

@Module({
  imports: [HttpModule.register({ baseURL: BINANCE_API })],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
