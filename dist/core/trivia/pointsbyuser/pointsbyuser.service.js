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
const pointsbyuser_entity_1 = require("./pointsbyuser.entity");
const moment = require("moment");
let PointsbyuserService = class PointsbyuserService {
    constructor(pointsbyuserRepository) {
        this.pointsbyuserRepository = pointsbyuserRepository;
    }
    getUserPointsHistory(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pointsByUserToReturn = [];
                const pointsByUserList = yield this.pointsbyuserRepository.createQueryBuilder("pobyus")
                    .select(["pobyus.id", "pobyus.points", "pobyus.isAdded", "pobyus.createdAt", "quizz.id", "quizz.name", "product.id", "product.title"])
                    .innerJoin("pobyus.user", "user")
                    .innerJoinAndSelect("pobyus.pointsType", "poty")
                    .leftJoin("pobyus.quizz", "quizz")
                    .leftJoin("pobyus.product", "product")
                    .where("user.email = :userEmail AND pobyus.isDeleted = :isDeleted", { userEmail: requestDTO.email, isDeleted: false })
                    .skip(requestDTO.page * 1)
                    .orderBy("pobyus.createdAt", "DESC")
                    .take(1)
                    .getMany();
                pointsByUserList.forEach(points => {
                    pointsByUserToReturn.push({
                        id: points.id,
                        points: points.isAdded ? '+' + points.points : '-' + points.points,
                        createdAt: moment(points.createdAt).format('DD/MMM/YYYY'),
                        pointsType: points.pointsType.name,
                        name: points.pointsType.id !== 4 ? (points.quizz ? points.quizz.name : points.product.title) : 'ADMINITRACIÓN'
                    });
                });
                return { points: pointsByUserToReturn };
            }
            catch (err) {
                console.log("PointsbyuserService - getUserPointsHistory: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting points',
                }, 500);
            }
        });
    }
    getCampaingUserHistory(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pointsByUserToReturn = [];
                const pointsByUserList = yield this.pointsbyuserRepository.createQueryBuilder("pobyus")
                    .select(["cmp.id", "cmp.name"])
                    .innerJoin("pobyus.user", "user", "user.email = :email", { email: requestDTO.email })
                    .leftJoin("pobyus.quizz", "quizz")
                    .innerJoin("quizz.campaing", "cmp")
                    .where("pobyus.isDeleted = :isDeleted AND pobyus.quizz IS NOT NULL", { isDeleted: false })
                    .skip(requestDTO.page * 20)
                    .groupBy("cmp.id")
                    .take(20)
                    .getMany();
                return { points: pointsByUserList };
            }
            catch (err) {
                console.log("PointsbyuserService - getCampaingUserHistory: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaing history',
                }, 500);
            }
        });
    }
};
PointsbyuserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(pointsbyuser_entity_1.Pointsbyuser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PointsbyuserService);
exports.PointsbyuserService = PointsbyuserService;
//# sourceMappingURL=pointsbyuser.service.js.map