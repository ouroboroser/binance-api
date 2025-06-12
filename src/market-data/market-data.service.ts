import { Injectable } from '@nestjs/common';
import { BinanceService } from '../providers/binance/binance.service';
import { GetHistoricalTrades } from './dtos/get-historical-trades.dto';
import { Trade, TradeSchema } from '../database/schemas/trade.schema';
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
      return {
        id: trade.id,
        price: trade.price,
        qty: trade.qty,
        quoteQty: trade.quoteQty,
        time: new Date(trade.time).toISOString(),
        isBuyerMaker: trade.isBuyerMaker,
        isBestMatch: trade.isBestMatch,
        priceForOne: (trade.quoteQty / trade.qty).toFixed(2),
      };
    });

    await this.tradeModel.insertMany(trades, { ordered: false });

    return formattedTrades;
  }
}
