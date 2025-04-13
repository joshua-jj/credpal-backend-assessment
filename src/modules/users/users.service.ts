import { LoggerService } from '@common/logger/logger.service';
import { WalletsService } from '@modules/wallets/wallets.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly walletsService: WalletsService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    const createdUser = await this.usersRepository.save(user);
    const { walletId } = await this.walletsService.create(createdUser.id);
    return { ...createdUser, walletId };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async getProfile(userId: number) {
    const { fullName, email } = await this.usersRepository.findOneBy({
      id: userId,
    });
    return { fullName, email };
  }
}
