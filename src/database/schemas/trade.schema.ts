import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Trade {
    @Prop()
    id: number;
}

// "price": "107041.99000000",
//         "qty": "0.02542000",
//         "quoteQty": "2721.00738580",
//         "time": 1749731073369,
//         "isBuyerMaker": true,
//         "isBestMatch": true