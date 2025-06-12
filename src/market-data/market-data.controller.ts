import { Body, Controller } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { GetHistoricalTrades } from './dtos/get-historical-trades.dto';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  async getHistoricalTrades(@Body() body: GetHistoricalTrades) {
    const res = await this.marketDataService.getMarketData(body.symbol);
  }
}
