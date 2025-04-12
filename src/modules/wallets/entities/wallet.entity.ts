import { BaseAbstractEntity } from '@common/entities/base.entity';
import { Transaction } from '@modules/transactions/entities/transaction.entity';
import { User } from '@modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('wallets')
export class Wallet extends BaseAbstractEntity {
  @Column({ name: 'wallet_id', type: 'varchar', unique: true })
  walletId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.0 })
  balance: string;

  @OneToOne(() => User, (user) => user.wallet, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet, {
    cascade: true,
  })
  transactions: Transaction[];
}
