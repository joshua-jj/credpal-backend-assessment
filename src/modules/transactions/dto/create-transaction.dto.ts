import { TransactionType } from '@common/enums/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: TransactionType.CREDIT })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ example: '100.52' })
  amount: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  walletId: string;
}
