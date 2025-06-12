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

    const formattedTrades =  trades.map((trade) => {
      const t = {
        id: trade.id,
        price: trade.price,
        qty: trade.qty,
        quoteQty: '5614.58583840',
        time: 1749732692290,
        isBuyerMaker: true,
        isBestMatch: true,
      };
    })

    //await this.tradeModel.insertMany(trades, { ordered: false });
  }
}
