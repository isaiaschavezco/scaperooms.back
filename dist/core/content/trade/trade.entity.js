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
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../../users/user/user.entity");
let Trade = class Trade {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Trade.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Trade.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Trade.prototype, "isActive", void 0);
__decorate([
    typeorm_1.ManyToOne(type => product_entity_1.Product, product => product.trade),
    __metadata("design:type", product_entity_1.Product)
], Trade.prototype, "product", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.trade),
    __metadata("design:type", user_entity_1.User)
], Trade.prototype, "user", void 0);
Trade = __decorate([
    typeorm_1.Entity({ schema: 'Content' })
], Trade);
exports.Trade = Trade;
//# sourceMappingURL=trade.entity.js.map