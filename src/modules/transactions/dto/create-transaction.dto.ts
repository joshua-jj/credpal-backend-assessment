import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from '@common/enums/transaction-type.enum';

export class CreateTransactionDto {
  @ApiProperty({ example: TransactionType.DEPOSIT })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ example: '100.52' })
  amount: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  senderWalletId?: string;

  @ApiProperty()
  @IsString()
  receiverWalletId?: string | null;
}
