import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateTransactionsTable1744453189105
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
            enum: ['Credit', 'Debit'],
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'wallet_id',
            type: 'varchar',
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
        name: 'FK_wallet_transaction',
        columnNames: ['wallet_id'],
        referencedColumnNames: ['wallet_id'],
        referencedTableName: 'wallets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign keys first
    await queryRunner.dropForeignKey('transactions', 'FK_wallet_transaction');
    // Then drop the index
    await queryRunner.dropIndex('transactions', 'idx_type');
    // Finally, drop the table
    await queryRunner.dropTable('transactions');
  }
}
