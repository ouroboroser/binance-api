import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Trade {
  @Prop()
  id: number;

  @Prop()
  price: string;

  @Prop()
  qty: string;

  @Prop()
  quoteQty: string;

  @Prop()
  time: string;

  @Prop()
  isBuyerMaker: boolean;

  @Prop()
  isBestMatch: boolean;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
