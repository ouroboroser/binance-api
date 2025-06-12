import { Injectable } from '@nestjs/common';
import { BinanceService } from '../providers/binance/binance.service';

@Injectable()
export class MarketDataService {
  constructor(private readonly binanceService: BinanceService) {}

  async getMarketData(symbol: string) {
    const trades = await this.binanceService.getHistoricalTrades(symbol);

    console.log('trades', trades);
  }
}
