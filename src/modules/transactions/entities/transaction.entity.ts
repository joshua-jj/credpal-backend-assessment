import { BaseAbstractEntity } from '@common/entities/base.entity';
import { TransactionType } from '@common/enums/transaction-type.enum';
import { Wallet } from '@modules/wallets/entities/wallet.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class Transaction extends BaseAbstractEntity {
  @Column({ name: 'transaction_id', type: 'varchar', unique: true })
  transactionId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'wallet_id', referencedColumnName: 'walletId' })
  wallet: Wallet;
}
