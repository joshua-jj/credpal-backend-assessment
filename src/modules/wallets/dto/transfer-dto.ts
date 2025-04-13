import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class TransferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  receiverWalletId: string;

  @ApiProperty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @Transform(({ value }) => value.trim())
  amount: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  description: string;
}
