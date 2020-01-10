"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("../../users/user/user.entity");
const pointsbyuser_entity_1 = require("../../trivia/pointsbyuser/pointsbyuser.entity");
const points_type_entity_1 = require("../../trivia/points-type/points-type.entity");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([pointsbyuser_entity_1.Pointsbyuser]),
            typeorm_1.TypeOrmModule.forFeature([points_type_entity_1.PointsType])
        ],
        providers: [product_service_1.ProductService],
        controllers: [product_controller_1.ProductController]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map