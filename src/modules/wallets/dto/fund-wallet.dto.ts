import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class FundWalletDto {
  @ApiProperty()
  @IsString()
  @Length(16)
  cardNumber: string;

  @ApiProperty()
  @IsString()
  expiryDate: string;

  @ApiProperty()
  @IsString()
  @Length(3)
  cvv: string;
}
