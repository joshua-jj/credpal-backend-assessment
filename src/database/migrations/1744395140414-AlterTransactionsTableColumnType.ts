import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTransactionsTableColumnType1744395140414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const oldColumn = new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true
        })

        const newColumn = new TableColumn({
            name: 'description',
            type: 'text',
            isNullable: true
        })
        await queryRunner.changeColumn('transactions', oldColumn, newColumn)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const oldColumn = new TableColumn({
          name: 'description',
          type: 'text',
          isNullable: true,
        });

        const newColumn = new TableColumn({
          name: 'description',
          type: 'varchar',
          isNullable: true,
        });
        
        await queryRunner.changeColumn('transactions', newColumn, oldColumn);
    }

}
