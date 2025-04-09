import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUserTable1744210381406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['Active', 'Inactive'],
            default: "'Active'",
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
      'users',
      new TableIndex({
        name: 'idx_email',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'idx_email');
    await queryRunner.dropTable('users');
  }
}
