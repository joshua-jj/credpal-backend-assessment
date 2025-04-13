import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDecimal, IsString, Length } from 'class-validator';

export class FundWalletDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  cardNumber: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  expiryDate: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  cvv: string;

  @ApiProperty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @Transform(({ value }) => value.trim())
  amount: string;
}
