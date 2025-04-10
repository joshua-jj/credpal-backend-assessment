import { BaseAbstractEntity } from '@common/entities/base.entity';
import { Transaction } from '@modules/transactions/entities/transaction.entity';
import { User } from '@modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('wallets')
export class Wallet extends BaseAbstractEntity {
  @Column({ type: 'varchar', unique: true })
  wallet_id: string;

  @Column({ type: 'decimal', length: 15, scale: 2, default: 0.0 })
  balance: number;

  @OneToOne(() => User, (user) => user.wallet, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.senderWallet, {
    cascade: true,
  })
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiverWallet, {
    cascade: true,
  })
  receivedTransactions: Transaction[];
}
