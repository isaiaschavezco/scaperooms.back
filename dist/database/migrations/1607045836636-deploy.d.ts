import { MigrationInterface, QueryRunner } from "typeorm";
export declare class deploy1607045836636 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
