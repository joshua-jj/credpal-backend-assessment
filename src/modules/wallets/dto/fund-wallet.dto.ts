import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString, Length } from 'class-validator';

export class FundWalletDto {
  @ApiProperty()
  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @ApiProperty()
  @IsString()
  expiryDate: string;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  cvv: string;

  @ApiProperty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  amount: string;
}
