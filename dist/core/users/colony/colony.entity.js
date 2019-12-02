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
const delegation_entity_1 = require("../delegation/delegation.entity");
const user_entity_1 = require("../user/user.entity");
let Colony = class Colony {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Colony.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 150 }),
    __metadata("design:type", String)
], Colony.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => delegation_entity_1.Delegation, delegation => delegation.colony),
    __metadata("design:type", delegation_entity_1.Delegation)
], Colony.prototype, "delegation", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.User, user => user.colony),
    __metadata("design:type", Array)
], Colony.prototype, "user", void 0);
Colony = __decorate([
    typeorm_1.Entity({ schema: 'Users' })
], Colony);
exports.Colony = Colony;
//# sourceMappingURL=colony.entity.js.map