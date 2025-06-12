import { MarketDataService } from './market-data.service';
import { BinanceService } from '../providers/binance/binance.service';
import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';
import { Trade } from '../database/schemas/trade.schema';

describe('MarketDataService', () => {
  const binanceService = mock<BinanceService>();
  const modelTrade = mock<Model<Trade>>();

  let marketDataService: MarketDataService;

  beforeEach(() => {
    marketDataService = new MarketDataService(binanceService, modelTrade);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(marketDataService).toBeDefined();
  })

  it('should get trades from binance and return in formatted way')
});
