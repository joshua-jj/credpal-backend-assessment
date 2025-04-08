import { User } from '@modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  async addUsers() {
    console.log('Adding users...');
  }
}
