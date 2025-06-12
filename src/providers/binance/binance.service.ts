import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class BinanceService {
  constructor(private readonly httpService: HttpService) {}

  async getHistoricalTrades(symbol: string) {
    const trades = await this.httpService.axiosRef.get(
      `/api/v3/historicalTrades?symbol=${symbol}`,
    );

    return trades;
  }
}
