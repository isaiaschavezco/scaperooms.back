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
const type_entity_1 = require("../type/type.entity");
const city_entity_1 = require("../city/city.entity");
const delegation_entity_1 = require("../delegation/delegation.entity");
const colony_entity_1 = require("../colony/colony.entity");
const position_entity_1 = require("../position/position.entity");
const chain_entity_1 = require("../chain/chain.entity");
const role_entity_1 = require("../role/role.entity");
const trade_entity_1 = require("../../content/trade/trade.entity");
const quizz_entity_1 = require("../../trivia/quizz/quizz.entity");
const pointsbyuser_entity_1 = require("../../trivia/pointsbyuser/pointsbyuser.entity");
const answerbyuserquizz_entity_1 = require("../../trivia/answerbyuserquizz/answerbyuserquizz.entity");
const message_entity_1 = require("../../content/message/message.entity");
const notificacion_entity_1 = require("../notification/notificacion.entity");
const sesion_entity_1 = require("../sesion/sesion.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ length: 250 }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ length: 250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone" }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ length: 15 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ length: 250 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ length: 250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "drugstore", void 0);
__decorate([
    typeorm_1.Column({ length: 15, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "postalCode", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "points", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typeorm_1.Column({ length: 250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "town", void 0);
__decorate([
    typeorm_1.Column({ length: 250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "mayoralty", void 0);
__decorate([
    typeorm_1.Column({ length: 250, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "charge", void 0);
__decorate([
    typeorm_1.ManyToOne(type => city_entity_1.City, city => city.user),
    __metadata("design:type", city_entity_1.City)
], User.prototype, "city", void 0);
__decorate([
    typeorm_1.ManyToOne(type => delegation_entity_1.Delegation, delegation => delegation.user),
    __metadata("design:type", delegation_entity_1.Delegation)
], User.prototype, "delegation", void 0);
__decorate([
    typeorm_1.ManyToOne(type => colony_entity_1.Colony, colony => colony.user),
    __metadata("design:type", colony_entity_1.Colony)
], User.prototype, "colony", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type_entity_1.Type, tyype => tyype.user),
    __metadata("design:type", type_entity_1.Type)
], User.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => position_entity_1.Position, position => position.user),
    __metadata("design:type", position_entity_1.Position)
], User.prototype, "position", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chain_entity_1.Chain, chain => chain.user),
    __metadata("design:type", chain_entity_1.Chain)
], User.prototype, "chain", void 0);
__decorate([
    typeorm_1.ManyToOne(type => role_entity_1.Role, role => role.user),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(type => trade_entity_1.Trade, trade => trade.user),
    __metadata("design:type", Array)
], User.prototype, "trade", void 0);
__decorate([
    typeorm_1.ManyToMany(type => quizz_entity_1.Quizz, quizz => quizz.user),
    __metadata("design:type", Array)
], User.prototype, "quizz", void 0);
__decorate([
    typeorm_1.OneToMany(type => pointsbyuser_entity_1.Pointsbyuser, pointsbyuser => pointsbyuser.user),
    __metadata("design:type", Array)
], User.prototype, "pointsbyuser", void 0);
__decorate([
    typeorm_1.OneToMany(type => answerbyuserquizz_entity_1.Answerbyuserquizz, answerbyuserquizz => answerbyuserquizz.user),
    __metadata("design:type", Array)
], User.prototype, "answerbyuserquizz", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.user),
    __metadata("design:type", Array)
], User.prototype, "message", void 0);
__decorate([
    typeorm_1.ManyToMany(type => notificacion_entity_1.Notificacion, notificacion => notificacion.user),
    __metadata("design:type", Array)
], User.prototype, "notificacion", void 0);
__decorate([
    typeorm_1.OneToMany(type => sesion_entity_1.Sesion, sesion => sesion.user),
    __metadata("design:type", Array)
], User.prototype, "sesion", void 0);
User = __decorate([
    typeorm_1.Entity({ schema: 'Users' })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map