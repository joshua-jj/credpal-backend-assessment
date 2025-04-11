import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { HelperUtil } from '@common/utils/helper.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '@modules/wallets/entities/wallet.entity';
import { PaginationQueryParams } from '@common/types/pagination-query';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { senderWalletId, receiverWalletId } = createTransactionDto;
    let transactionId: string;
    let existingTransaction: Transaction;
    do {
      transactionId = HelperUtil.generateTransactionId();
      existingTransaction = await this.transactionsRepository.findOneBy({
        transactionId,
      });
    } while (existingTransaction);

    const transaction = this.transactionsRepository.create({
      transactionId,
      ...createTransactionDto,
    });

    if (senderWalletId) {
      transaction.senderWallet = {
        walletId: senderWalletId,
      } as Wallet;
    }
    transaction.receiverWallet = { walletId: receiverWalletId } as Wallet;
    return await this.transactionsRepository.save(transaction);
  }

  async getWalletTransactions(params: PaginationQueryParams, route: string) {}
}
