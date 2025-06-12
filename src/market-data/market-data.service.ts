import { Injectable } from '@nestjs/common';
import { BinanceService } from '../providers/binance/binance.service';
import { GetHistoricalTrades } from './dtos/get-historical-trades.dto';
import { Trade } from '../database/schemas/trade.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MarketDataService {
  constructor(
    private readonly binanceService: BinanceService,
    @InjectModel(Trade.name) private tradeModel: Model<Trade>,
  ) {}

  async getMarketData(data: GetHistoricalTrades) {
    const trades = await this.binanceService.getHistoricalTrades(
      data.symbol,
      data.limit,
      data.fromId,
    );

    const formattedTrades = trades.map((trade) => {
      // main idea was to compare prev price with current, was not able to finish due to time
      const priceForOne = (Number(trade.quoteQty) / Number(trade.qty)).toFixed(
        2,
      );

      return {
        id: trade.id,
        price: trade.price,
        qty: trade.qty,
        quoteQty: trade.quoteQty,
        time: new Date(trade.time).toISOString(),
        isBuyerMaker: trade.isBuyerMaker,
        isBestMatch: trade.isBestMatch,
        priceForOne,
      };
    });

    await this.tradeModel.insertMany(trades, { ordered: false });

    return formattedTrades;
  }
}
