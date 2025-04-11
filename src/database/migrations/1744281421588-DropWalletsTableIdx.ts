import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class DropWalletsTableIdx1744281421588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('wallets', 'idx_balance');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'wallets',
      new TableIndex({
        name: 'idx_balance',
        columnNames: ['balance'],
      }),
    );
  }
}
