import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
export class GetHistoricalTrades {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  symbol: string;
}
