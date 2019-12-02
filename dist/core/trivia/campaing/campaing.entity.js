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
const quizz_entity_1 = require("../quizz/quizz.entity");
const target_entity_1 = require("../target/target.entity");
let Campaing = class Campaing {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Campaing.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], Campaing.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 250 }),
    __metadata("design:type", String)
], Campaing.prototype, "portrait", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Campaing.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Campaing.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Campaing.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Campaing.prototype, "isBiodermaGame", void 0);
__decorate([
    typeorm_1.OneToMany(type => quizz_entity_1.Quizz, quizz => quizz.campaing),
    __metadata("design:type", Array)
], Campaing.prototype, "quizz", void 0);
__decorate([
    typeorm_1.ManyToMany(type => target_entity_1.Target, target => target.campaing),
    typeorm_1.JoinTable({ name: "targetsByCampaing" }),
    __metadata("design:type", Array)
], Campaing.prototype, "target", void 0);
Campaing = __decorate([
    typeorm_1.Entity({ schema: 'Trivia' })
], Campaing);
exports.Campaing = Campaing;
//# sourceMappingURL=campaing.entity.js.map