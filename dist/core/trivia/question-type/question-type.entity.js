"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const question_entity_1 = require("../question/question.entity");
let QuestionType = class QuestionType {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QuestionType.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], QuestionType.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(type => question_entity_1.Question, question => question.question_type),
    __metadata("design:type", Array)
], QuestionType.prototype, "question", void 0);
QuestionType = __decorate([
    typeorm_1.Entity({ schema: 'Trivia' })
], QuestionType);
exports.QuestionType = QuestionType;
//# sourceMappingURL=question-type.entity.js.map