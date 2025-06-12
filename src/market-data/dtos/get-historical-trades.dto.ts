import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
export class GetHistoricalTrades {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  symbol: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
