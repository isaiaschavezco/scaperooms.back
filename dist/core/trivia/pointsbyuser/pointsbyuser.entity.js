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
const user_entity_1 = require("../../users/user/user.entity");
const points_type_entity_1 = require("../points-type/points-type.entity");
const quizz_entity_1 = require("../quizz/quizz.entity");
const product_entity_1 = require("../../content/product/product.entity");
let Pointsbyuser = class Pointsbyuser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Pointsbyuser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Pointsbyuser.prototype, "points", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Pointsbyuser.prototype, "isAdded", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Pointsbyuser.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Pointsbyuser.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.pointsbyuser),
    __metadata("design:type", user_entity_1.User)
], Pointsbyuser.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => points_type_entity_1.PointsType, pointsType => pointsType.pointsbyuser),
    __metadata("design:type", points_type_entity_1.PointsType)
], Pointsbyuser.prototype, "pointsType", void 0);
__decorate([
    typeorm_1.ManyToOne(type => quizz_entity_1.Quizz, quizz => quizz.pointsbyuser),
    __metadata("design:type", quizz_entity_1.Quizz)
], Pointsbyuser.prototype, "quizz", void 0);
__decorate([
    typeorm_1.ManyToOne(type => product_entity_1.Product, product => product.pointsbyuser),
    __metadata("design:type", product_entity_1.Product)
], Pointsbyuser.prototype, "product", void 0);
Pointsbyuser = __decorate([
    typeorm_1.Entity({ schema: 'Trivia' })
], Pointsbyuser);
exports.Pointsbyuser = Pointsbyuser;
//# sourceMappingURL=pointsbyuser.entity.js.map