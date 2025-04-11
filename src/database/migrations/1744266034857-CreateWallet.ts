import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateWallet1744266034857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Table
    await queryRunner.createTable(
      new Table({
        name: 'wallets',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'wallet_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'balance',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0.0,
          },
          {
            name: 'user_id',
            type: 'bigint',
            isUnique: true,
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
      'wallets',
      new TableIndex({
        name: 'idx_balance',
        columnNames: ['balance'],
      }),
    );

    // Create foreign key
    await queryRunner.createForeignKey(
      'wallets',
      new TableForeignKey({
        name: 'FK_user_wallet',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key first
    await queryRunner.dropForeignKey('wallets', 'FK_user_wallet');
    // Then drop the index
    await queryRunner.dropIndex('wallets', 'idx_balance');
    // Finally, drop the table
    await queryRunner.dropTable('wallets');
  }
}
