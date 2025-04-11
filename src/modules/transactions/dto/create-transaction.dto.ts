import { TransactionType } from '@common/enums/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

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
  receiverWalletId: string;
}
