import { PaginationQueryParams } from '@common/types/pagination-query';
import { HelperUtil } from '@common/utils/helper.util';
import { Wallet } from '@modules/wallets/entities/wallet.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ILike, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

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

  async getWalletTransactions(
    params: PaginationQueryParams,
    walletId: string,
    route: string,
  ) {
    const { page, limit, search, filter } = params;
    const where = {};

    if (search) {
      where['transactionId'] = ILike(`%${search}%`);
    }

    if (filter) {
      where['type'] = filter;
    }

    where['senderWallet'] = { walletId };

    const options = { page, limit, route };

    const paginatedTransactions = paginate<Transaction>(
      this.transactionsRepository,
      options,
      {
        where,
        order: {
          createdAt: 'DESC',
        },
      },
    );

    return paginatedTransactions;
  }
}
