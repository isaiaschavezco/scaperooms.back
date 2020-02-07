import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class TargetIsAdmin1581102603365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("Trivia.target", new TableColumn({
            name: "roleId",
            type: "integer",
            isNullable: true
        }));

        await queryRunner.createForeignKey("Trivia.target", new TableForeignKey({
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "Users.role",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
