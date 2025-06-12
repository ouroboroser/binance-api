import { MarketDataService } from './market-data.service';
import { BinanceService } from '../providers/binance/binance.service';
import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';
import { Trade } from '../database/schemas/trade.schema';
import { TradeInterface } from '../providers/binance/types/trade.interface';

describe('MarketDataService', () => {
  const binanceService: BinanceService = mock<BinanceService>();
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
  });

  it('should get trades from binance and return in formatted way', async () => {
    // given
    const trades: TradeInterface[] = [
      {
        id: 195694895,
        price: '107230.44000000',
        qty: '0.05236000',
        quoteQty: '5614.58583840',
        time: 1749732692290,
        isBuyerMaker: true,
        isBestMatch: true,
      },
      {
        id: 195694896,
        price: '107230.45000000',
        qty: '0.00004000',
        quoteQty: '4.28921800',
        time: 1749732692410,
        isBuyerMaker: false,
        isBestMatch: true,
      },
    ];

    binanceService.getHistoricalTrades = jest.fn().mockResolvedValue(trades);

    // when
    const res = await marketDataService.getMarketData({ symbol: 'BTCUSDC' });

    // then
    expect(res).toHaveLength(2);
    expect(res).toEqual(
      expect.arrayContaining([
        {
          id: 195694895,
          price: '107230.44000000',
          qty: '0.05236000',
          quoteQty: '5614.58583840',
          time: new Date(1749732692290).toISOString(),
          isBuyerMaker: true,
          isBestMatch: true,
          priceForOne: '107230.44',
        },
        {
          id: 195694896,
          price: '107230.45000000',
          qty: '0.00004000',
          quoteQty: '4.28921800',
          time: new Date(1749732692410).toISOString(),
          isBuyerMaker: false,
          isBestMatch: true,
          priceForOne: '107230.45',
        },
      ]),
    );
  });

  it('should analyze price correcntly', async () => {
    // given
    const trades: TradeInterface[] = [
      {
        id: 195694895,
        price: '107230.44000000',
        qty: '5',
        quoteQty: '10',
        time: 1749732692290,
        isBuyerMaker: true,
        isBestMatch: true,
      },
      {
        id: 195694896,
        price: '107230.45000000',
        qty: '3',
        quoteQty: '10',
        time: 1749732692410,
        isBuyerMaker: false,
        isBestMatch: true,
      },
    ];

    binanceService.getHistoricalTrades = jest.fn().mockResolvedValue(trades);

    // when
    const res = await marketDataService.getMarketData({ symbol: 'BTCUSDC' });

    // then
    expect(res).toHaveLength(2);
    expect(res).toEqual(
      expect.arrayContaining([
        {
          id: 195694895,
          price: '107230.44000000',
          qty: '5',
          quoteQty: '10',
          time: '2025-06-12T12:51:32.290Z',
          isBuyerMaker: true,
          isBestMatch: true,
          priceForOne: '2.00',
        },
        {
          id: 195694896,
          price: '107230.45000000',
          qty: '3',
          quoteQty: '10',
          time: '2025-06-12T12:51:32.410Z',
          isBuyerMaker: false,
          isBestMatch: true,
          priceForOne: '3.33',
        },
      ]),
    );
  });
});
