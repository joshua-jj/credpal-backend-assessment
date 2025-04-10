import { BaseAbstractEntity } from '@common/entities/base.entity';
import { TransactionType } from '@common/enums/transaction-type.enum';
import { User } from '@modules/users/entities/user.entity';
import { Wallet } from '@modules/wallets/entities/wallet.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('transactions')
export class Transaction extends BaseAbstractEntity {
  @Column({ type: 'varchar', unique: true })
  transaction_id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'decimal', length: 15, scale: 2 })
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.sentTransactions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sender_wallet_id' })
  senderWallet: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.receivedTransactions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'receiver_wallet_id' })
  receiverWallet: Wallet;
}
