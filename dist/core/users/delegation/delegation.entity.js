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
const city_entity_1 = require("../city/city.entity");
const colony_entity_1 = require("../colony/colony.entity");
const user_entity_1 = require("../user/user.entity");
const target_entity_1 = require("../../trivia/target/target.entity");
let Delegation = class Delegation {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Delegation.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 150 }),
    __metadata("design:type", String)
], Delegation.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => city_entity_1.City, city => city.delegation),
    __metadata("design:type", city_entity_1.City)
], Delegation.prototype, "city", void 0);
__decorate([
    typeorm_1.OneToMany(type => colony_entity_1.Colony, colony => colony.delegation),
    __metadata("design:type", Array)
], Delegation.prototype, "colony", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.User, user => user.delegation),
    __metadata("design:type", Array)
], Delegation.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => target_entity_1.Target, target => target.delegation),
    __metadata("design:type", Array)
], Delegation.prototype, "target", void 0);
Delegation = __decorate([
    typeorm_1.Entity({ schema: 'Users' })
], Delegation);
exports.Delegation = Delegation;
//# sourceMappingURL=delegation.entity.js.map