import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class BinanceService {
  constructor(private readonly httpService: HttpService) {}

  async getHistoricalTrades(symbol: string, limit: number, fromId) {
    const trades = await this.httpService.axiosRef.get(
      `/api/v3/historicalTrades`,
      {
        params: {
          symbol,
          limit,
        },
      },
    );

    return trades;
  }
}
