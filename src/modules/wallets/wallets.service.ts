import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { HelperUtil } from '../../common/utils/helper.util';
import { User } from '@modules/users/entities/user.entity';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletsRepository: Repository<Wallet>,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(WalletsService.name);
  }
  async create(userId: number) {
    this.logger.log('userID', userId);
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

  async getBalance(userId: number) {
    const wallet = await this.walletsRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    const { balance } = wallet;
    return { balance };
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
