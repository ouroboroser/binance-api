import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Trade } from '../../database/schemas/trade.schema';
@Injectable()
export class BinanceService {
  constructor(private readonly httpService: HttpService) {}

  async getHistoricalTrades(
    symbol: string,
    limit?: number,
    fromId?: number,
  ): Promise<Trade[]> {
    const trades = await this.httpService.axiosRef.get(
      `/api/v3/historicalTrades`,
      {
        params: {
          symbol,
          limit,
          fromId,
        },
      },
    );

    return trades.data;
  }
}
