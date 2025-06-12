import { Body, Controller, Get } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { GetHistoricalTrades } from './dtos/get-historical-trades.dto';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get('/trades/historical')
  async getHistoricalTrades(@Body() body: GetHistoricalTrades) {
    const res = await this.marketDataService.getMarketData(body.symbol);
  }
}
