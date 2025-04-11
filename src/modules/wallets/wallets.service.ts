import { TransactionType } from '@common/enums/transaction-type.enum';
import { LoggerService } from '@common/logger/logger.service';
import { HelperUtil } from '@common/utils/helper.util';
import { CreateTransactionDto } from '@modules/transactions/dto/create-transaction.dto';
import { TransactionsService } from '@modules/transactions/transactions.service';
import { User } from '@modules/users/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletsRepository: Repository<Wallet>,
    private readonly logger: LoggerService,
    private readonly transactionsService: TransactionsService,
  ) {
    this.logger.setContext(WalletsService.name);
  }
  async create(userId: number) {
    let walletId: string;
    let existingWallet: Wallet;
    do {
      walletId = HelperUtil.generateWalletId();
      existingWallet = await this.walletsRepository.findOneBy({
        walletId,
      });
    } while (existingWallet);

    const wallet = this.walletsRepository.create({ walletId });
    wallet.user = { id: userId } as User;
    return await this.walletsRepository.save(wallet);
  }

  async getBalance(walletId: string) {
    const { balance } = await this.findOne(walletId);
    return { balance };
  }

  async findOne(walletId: string) {
    return await this.walletsRepository.findOneBy({ walletId });
  }

  async fund(fundWalletDto: FundWalletDto, walletId: string) {
    const { expiryDate, amount } = fundWalletDto;
    const isExpiryDateValid = HelperUtil.isValidMMYY(expiryDate);
    if (!isExpiryDateValid) {
      throw new BadRequestException('Expiry date must be in MM/YY format');
    }

    const wallet = await this.findOne(walletId);
    const newBalance = Number(wallet.balance) + Number(amount);
    const newWallet = { ...wallet, balance: String(newBalance) };
    const createTransactionDto: CreateTransactionDto = {
      type: TransactionType.DEPOSIT,
      amount,
      receiverWalletId: walletId,
    };
    await this.walletsRepository.save(newWallet);
    await this.transactionsService.create(createTransactionDto);
  }
}
