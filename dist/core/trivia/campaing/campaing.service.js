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
const campaing_entity_1 = require("./campaing.entity");
const target_entity_1 = require("../target/target.entity");
const user_entity_1 = require("../../users/user/user.entity");
const moment = require("moment");
const bcrypt = require("bcrypt");
let CampaingService = class CampaingService {
    constructor(campaingRepository, targetRepository, userRepository) {
        this.campaingRepository = campaingRepository;
        this.targetRepository = targetRepository;
        this.userRepository = userRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campaingList = yield this.campaingRepository.find({
                    relations: ["target", "target.city", "target.chain", "target.position", "target.type"]
                });
                return campaingList;
            }
            catch (err) {
                console.log("CampaingService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    findAllActives(isBioderma) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campaingList = yield this.campaingRepository.find({
                    where: { isDeleted: false, isBiodermaGame: isBioderma },
                    order: { createdAt: 'DESC' },
                    relations: ["target", "target.city", "target.chain", "target.position", "target.type", "target.role"]
                });
                return campaingList;
            }
            catch (err) {
                console.log("CampaingService - findAllActives: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    findTopCampaing(campaingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.campaingRepository.findOne(campaingId, {
                    relations: ["quizz", "quizz.user", "quizz.user.chain"]
                });
                return response;
            }
            catch (err) {
                console.log("CampaingService - findTopCampaing: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    findCampaingsByUser(getCampaingsByUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.campaingRepository.createQueryBuilder("campaing")
                    .select("campaing.id", "id")
                    .distinctOn(["campaing.id"])
                    .addSelect("campaing.name", "name")
                    .addSelect("campaing.portrait", "portrait")
                    .addSelect("campaing.isBiodermaGame", "type")
                    .innerJoin("campaing.quizz", "quizz", "quizz.isActive = :isActive", { isActive: true })
                    .innerJoin("quizz.user", "user", "user.email = :email", { email: getCampaingsByUserDTO.email })
                    .where("campaing.isBiodermaGame = :isBiodermaGame", { isBiodermaGame: getCampaingsByUserDTO.isBiodermaGame })
                    .orderBy("campaing.id", "DESC")
                    .getRawMany();
                return { campaings: response };
            }
            catch (err) {
                console.log("CampaingService - findCampaingsByUser: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newCampaing = this.campaingRepository.create({
                    name: createDTO.name,
                    portrait: createDTO.portrait,
                    isActive: true,
                    isDeleted: false,
                    isBiodermaGame: createDTO.isBiodermaGame
                });
                const campaingTargets = yield this.targetRepository.findByIds(createDTO.targets);
                newCampaing.target = campaingTargets;
                yield this.campaingRepository.save(newCampaing);
                return { status: 0 };
            }
            catch (err) {
                console.log("CampaingService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating campaing',
                }, 500);
            }
        });
    }
    getCampaingUserHistoy(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let campaingHistoryToReturn = [];
                const campaingsList = yield this.campaingRepository.createQueryBuilder("cmp")
                    .select("cmp.id", "id")
                    .addSelect("cmp.name", "name")
                    .addSelect("cmp.createdAt", "createdAt")
                    .addSelect("cmp.isBiodermaGame", "isBiodermaGame")
                    .addSelect("SUM(pobyus.points)", "totalPoints")
                    .innerJoin("cmp.quizz", "quizz")
                    .innerJoin("quizz.user", "user", "user.email = :email", { email: requestDTO.email })
                    .innerJoin("quizz.pointsbyuser", "pobyus", "pobyus.user = user.id", {})
                    .groupBy("cmp.id")
                    .skip(requestDTO.page * 20)
                    .take(20)
                    .getRawMany();
                campaingsList.forEach(tempCamp => {
                    campaingHistoryToReturn.push({
                        id: tempCamp.id,
                        name: tempCamp.name,
                        createdAt: moment(tempCamp.createdAt).format('DD/MM/YYYY'),
                        isBiodermaGame: tempCamp.isBiodermaGame,
                        points: tempCamp.totalPoints
                    });
                });
                return { campaings: campaingHistoryToReturn };
            }
            catch (err) {
                console.log("CampaingService - getCampaingUserHistoy: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaing history',
                }, 500);
            }
        });
    }
    delete(removeCampaingDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                const userExist = yield this.userRepository.findOne({
                    where: { email: removeCampaingDTO.email },
                    select: ["id", "name", "email", "points", "password"]
                });
                if (userExist) {
                    const match = yield bcrypt.compare(removeCampaingDTO.password, userExist.password);
                    if (match) {
                        let campaingToRemove = yield this.campaingRepository.findOne(removeCampaingDTO.campaingId, {
                            relations: ["target", "quizz"]
                        });
                        if (campaingToRemove.quizz.length > 0) {
                            response = { status: 11 };
                        }
                        else {
                            yield this.campaingRepository.remove(campaingToRemove);
                            response = { status: 0 };
                        }
                    }
                    else {
                        response = { status: 2 };
                    }
                }
                else {
                    response = { status: 1 };
                }
                return response;
            }
            catch (err) {
                console.log("CampaingService - delete: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error deleting campaings',
                }, 500);
            }
        });
    }
};
CampaingService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(campaing_entity_1.Campaing)),
    __param(1, typeorm_1.InjectRepository(target_entity_1.Target)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CampaingService);
exports.CampaingService = CampaingService;
//# sourceMappingURL=campaing.service.js.map