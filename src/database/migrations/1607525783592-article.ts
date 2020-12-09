import {MigrationInterface, QueryRunner} from "typeorm";

export class article1607525783592 implements MigrationInterface {
    name = 'article1607525783592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Content"."targetsByArticle" ("articleId" integer NOT NULL, "targetId" integer NOT NULL, CONSTRAINT "PK_04a061e1aa9b54f7a86b6f32573" PRIMARY KEY ("articleId", "targetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4229e241e8a621f9a78a84e8d" ON "Content"."targetsByArticle" ("articleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5dcac4b9d3a96e78cb3557d9a" ON "Content"."targetsByArticle" ("targetId") `);
        await queryRunner.query(`ALTER TABLE "Content"."article" ADD "isAll" boolean`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" ADD CONSTRAINT "FK_c4229e241e8a621f9a78a84e8d9" FOREIGN KEY ("articleId") REFERENCES "Content"."article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" ADD CONSTRAINT "FK_e5dcac4b9d3a96e78cb3557d9a0" FOREIGN KEY ("targetId") REFERENCES "Trivia"."target"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" DROP CONSTRAINT "FK_e5dcac4b9d3a96e78cb3557d9a0"`);
        await queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" DROP CONSTRAINT "FK_c4229e241e8a621f9a78a84e8d9"`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Content"."article" DROP COLUMN "isAll"`);
        await queryRunner.query(`DROP INDEX "Content"."IDX_e5dcac4b9d3a96e78cb3557d9a"`);
        await queryRunner.query(`DROP INDEX "Content"."IDX_c4229e241e8a621f9a78a84e8d"`);
        await queryRunner.query(`DROP TABLE "Content"."targetsByArticle"`);
    }

}
