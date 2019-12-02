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
const user_entity_1 = require("../user/user.entity");
let Sesion = class Sesion {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Sesion.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Sesion.prototype, "loggedInAt", void 0);
__decorate([
    typeorm_1.Column({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Sesion.prototype, "playerId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.sesion),
    __metadata("design:type", user_entity_1.User)
], Sesion.prototype, "user", void 0);
Sesion = __decorate([
    typeorm_1.Entity({ schema: 'Users' })
], Sesion);
exports.Sesion = Sesion;
//# sourceMappingURL=sesion.entity.js.map