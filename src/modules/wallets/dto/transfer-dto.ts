import { ApiProperty } from '@nestjs/swagger';
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
  receiverWalletId: string;

  @ApiProperty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  amount: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note: string;
}
