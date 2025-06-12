import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketDataModule } from './market-data/market-data.module';
import { MongooseModule } from '@nestjs/mongoose';

const DB_NAME = 'binance-test'; // should be in .env
@Module({
  imports: [
    MarketDataModule,
    MongooseModule.forRoot(`mongodb://localhost/${DB_NAME}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
