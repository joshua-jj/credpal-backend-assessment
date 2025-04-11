import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class DropTransactionsTable1744359508923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('transactions', 'idx_type');
    await queryRunner.dropTable('transactions');
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
  }
}
