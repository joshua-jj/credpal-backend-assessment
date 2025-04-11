import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateTransactionsTable1744268064137
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Table
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'transaction_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['Deposit', 'Withdrawal', 'Transfer'],
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'sender_wallet_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'receiver_wallet_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create Index
    await queryRunner.createIndex(
      'transactions',
      new TableIndex({
        name: 'idx_type',
        columnNames: ['type'],
      }),
    );

    // Create foreign keys
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'FK_sender_wallet_transaction',
        columnNames: ['sender_wallet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallets',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'FK_receiver_wallet_transaction',
        columnNames: ['receiver_wallet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallets',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign keys first
    await queryRunner.dropForeignKey(
      'transactions',
      'FK_sender_wallet_transaction',
    );
    await queryRunner.dropForeignKey(
      'transactions',
      'FK_receiver_wallet_transaction',
    );
    // Then drop the index
    await queryRunner.dropIndex('transactions', 'idx_type');
    // Finally, drop the table
    await queryRunner.dropTable('transactions');
  }
}
