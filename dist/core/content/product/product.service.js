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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("../../users/user/user.entity");
const pointsbyuser_entity_1 = require("../../trivia/pointsbyuser/pointsbyuser.entity");
const points_type_entity_1 = require("../../trivia/points-type/points-type.entity");
const mailer_1 = require("@nest-modules/mailer");
let ProductService = class ProductService {
    constructor(productRepository, userRepository, pointsbyuserRepository, pointsTypeRepository, mailerService) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.pointsbyuserRepository = pointsbyuserRepository;
        this.pointsTypeRepository = pointsTypeRepository;
        this.mailerService = mailerService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productsList = yield this.productRepository.find({
                    where: { isActive: true },
                    order: {
                        title: "ASC"
                    }
                });
                return { products: productsList };
            }
            catch (err) {
                console.log("ProductService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting products',
                }, 500);
            }
        });
    }
    update(updateProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productToUpdate = yield this.productRepository.findOne(updateProductDTO.productId);
                productToUpdate.title = updateProductDTO.title;
                productToUpdate.description = updateProductDTO.description;
                productToUpdate.image = updateProductDTO.image;
                productToUpdate.points = updateProductDTO.points;
                yield this.productRepository.save(productToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ProductService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error updating product',
                }, 500);
            }
        });
    }
    create(createProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newProduct = this.productRepository.create({
                    title: createProductDTO.title,
                    image: createProductDTO.image,
                    description: createProductDTO.description,
                    points: createProductDTO.points,
                    isActive: true
                });
                yield this.productRepository.save(newProduct);
                return { status: 0 };
            }
            catch (err) {
                console.log("ProductService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating product',
                }, 500);
            }
        });
    }
    delete(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productToDelete = yield this.productRepository.findOne(productId);
                productToDelete.isActive = false;
                yield this.productRepository.save(productToDelete);
                return { status: 0 };
            }
            catch (err) {
                console.log("ProductService - delete: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error deleting token',
                }, 500);
            }
        });
    }
    registerShopCart(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                let totalPoints = 0;
                const productsToBuy = yield this.productRepository.findByIds(requestDTO.products);
                productsToBuy.forEach(product => {
                    totalPoints += product.points;
                });
                let userBuying = yield this.userRepository.findOne({
                    where: { email: requestDTO.email }
                });
                if (userBuying.points < totalPoints) {
                    response = { status: 4 };
                }
                else {
                    const pointsType = yield this.pointsTypeRepository.findOne(3);
                    for (let index = 0; index < productsToBuy.length; index++) {
                        const productToBuy = productsToBuy[index];
                        const pointsToRegister = this.pointsbyuserRepository.create({
                            isAdded: false,
                            isDeleted: false,
                            points: productToBuy.points,
                            pointsType: pointsType,
                            createdAt: new Date(),
                            quizz: null,
                            product: productToBuy,
                            user: userBuying
                        });
                        yield this.pointsbyuserRepository.save(pointsToRegister);
                    }
                    userBuying.points -= totalPoints;
                    yield this.userRepository.save(userBuying);
                    yield this.mailerService.sendMail({
                        to: userBuying.email,
                        subject: 'Confirmación de productos.',
                        template: 'cart',
                        context: {
                            products: productsToBuy
                        },
                    });
                }
                return response;
            }
            catch (err) {
                console.log("ProductService - registerShopCart: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error buying products',
                }, 500);
            }
        });
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_1.InjectRepository(pointsbyuser_entity_1.Pointsbyuser)),
    __param(3, typeorm_1.InjectRepository(points_type_entity_1.PointsType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map