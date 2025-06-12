import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketDataModule } from './market-data/market-data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MarketDataModule,
    MongooseModule.forRoot('mongodb://localhost/binance-test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
