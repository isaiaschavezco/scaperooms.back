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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./product.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.findAll();
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.create(createDTO);
        });
    }
    shopProducts(shopCartProducts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.registerShopCart(shopCartProducts);
        });
    }
    update(updateProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.update(updateProductDTO);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    common_1.Post('cart'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ShopCartProducts]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "shopProducts", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    common_1.Controller('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map