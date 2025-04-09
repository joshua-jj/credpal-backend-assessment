import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [AuthenticationModule, UsersModule, TransactionsModule]
})
export class ModulesModule {}
