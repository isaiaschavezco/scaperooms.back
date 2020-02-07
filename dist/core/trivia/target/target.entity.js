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
const city_entity_1 = require("../../users/city/city.entity");
const chain_entity_1 = require("../../users/chain/chain.entity");
const position_entity_1 = require("../../users/position/position.entity");
const type_entity_1 = require("../../users/type/type.entity");
const campaing_entity_1 = require("../campaing/campaing.entity");
const role_entity_1 = require("../../users/role/role.entity");
let Target = class Target {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Target.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Target.prototype, "initAge", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Target.prototype, "finalAge", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Target.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Target.prototype, "allUsers", void 0);
__decorate([
    typeorm_1.ManyToOne(type => city_entity_1.City, city => city.target),
    __metadata("design:type", city_entity_1.City)
], Target.prototype, "city", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chain_entity_1.Chain, chain => chain.target),
    __metadata("design:type", chain_entity_1.Chain)
], Target.prototype, "chain", void 0);
__decorate([
    typeorm_1.ManyToOne(type => position_entity_1.Position, position => position.target),
    __metadata("design:type", position_entity_1.Position)
], Target.prototype, "position", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type_entity_1.Type, tyype => tyype.target),
    __metadata("design:type", type_entity_1.Type)
], Target.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => role_entity_1.Role, role => role.target),
    __metadata("design:type", role_entity_1.Role)
], Target.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToMany(type => campaing_entity_1.Campaing, campaing => campaing.target),
    __metadata("design:type", Array)
], Target.prototype, "campaing", void 0);
Target = __decorate([
    typeorm_1.Entity({ schema: 'Trivia' })
], Target);
exports.Target = Target;
//# sourceMappingURL=target.entity.js.map