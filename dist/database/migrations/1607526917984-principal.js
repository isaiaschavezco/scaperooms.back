"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class principal1607526917984 {
    constructor() {
        this.name = 'principal1607526917984';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "Content"."targetsByArticle" ("articleId" integer NOT NULL, "targetId" integer NOT NULL, CONSTRAINT "PK_04a061e1aa9b54f7a86b6f32573" PRIMARY KEY ("articleId", "targetId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_c4229e241e8a621f9a78a84e8d" ON "Content"."targetsByArticle" ("articleId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_e5dcac4b9d3a96e78cb3557d9a" ON "Content"."targetsByArticle" ("targetId") `);
            yield queryRunner.query(`ALTER TABLE "Content"."article" ADD "isAll" boolean`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" ADD CONSTRAINT "FK_c4229e241e8a621f9a78a84e8d9" FOREIGN KEY ("articleId") REFERENCES "Content"."article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" ADD CONSTRAINT "FK_e5dcac4b9d3a96e78cb3557d9a0" FOREIGN KEY ("targetId") REFERENCES "Trivia"."target"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" DROP CONSTRAINT "FK_e5dcac4b9d3a96e78cb3557d9a0"`);
            yield queryRunner.query(`ALTER TABLE "Content"."targetsByArticle" DROP CONSTRAINT "FK_c4229e241e8a621f9a78a84e8d9"`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "Content"."article" DROP COLUMN "isAll"`);
            yield queryRunner.query(`DROP INDEX "Content"."IDX_e5dcac4b9d3a96e78cb3557d9a"`);
            yield queryRunner.query(`DROP INDEX "Content"."IDX_c4229e241e8a621f9a78a84e8d"`);
            yield queryRunner.query(`DROP TABLE "Content"."targetsByArticle"`);
        });
    }
}
exports.principal1607526917984 = principal1607526917984;
//# sourceMappingURL=1607526917984-principal.js.map