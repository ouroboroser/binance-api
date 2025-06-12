import { Injectable } from '@nestjs/common';
import { BinanceService } from '../providers/binance/binance.service';
import { GetHistoricalTrades } from './dtos/get-historical-trades.dto';

@Injectable()
export class MarketDataService {
  constructor(private readonly binanceService: BinanceService) {}

  async getMarketData(data: GetHistoricalTrades) {
    const trades = await this.binanceService.getHistoricalTrades(
      data.symbol,
      data.limit,
      data.fromId,
    );

    console.log('trades', trades);
  }
}
