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
const trade_entity_1 = require("../trade/trade.entity");
const pointsbyuser_entity_1 = require("../../trivia/pointsbyuser/pointsbyuser.entity");
let Product = class Product {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ length: 250 }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "smallint" }),
    __metadata("design:type", Number)
], Product.prototype, "points", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    typeorm_1.OneToMany(type => trade_entity_1.Trade, trade => trade.product),
    __metadata("design:type", Array)
], Product.prototype, "trade", void 0);
__decorate([
    typeorm_1.OneToMany(type => pointsbyuser_entity_1.Pointsbyuser, pointsbyuser => pointsbyuser.product),
    __metadata("design:type", Array)
], Product.prototype, "pointsbyuser", void 0);
Product = __decorate([
    typeorm_1.Entity({ schema: 'Content' })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map