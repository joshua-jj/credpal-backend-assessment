import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTransactionsTableColumn1744378835492
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE transactions 
        ADD COLUMN description VARCHAR(255) NULL 
        AFTER amount;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'description');
  }
}
