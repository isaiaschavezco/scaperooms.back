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
const quizz_entity_1 = require("./quizz.entity");
const campaing_entity_1 = require("../campaing/campaing.entity");
const user_entity_1 = require("../../users/user/user.entity");
const quizz_dto_1 = require("./quizz.dto");
const moment = require("moment");
let QuizzService = class QuizzService {
    constructor(quizzRepository, campaingRepository, userRepository) {
        this.quizzRepository = quizzRepository;
        this.campaingRepository = campaingRepository;
        this.userRepository = userRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzList = yield this.quizzRepository.find();
                return quizzList;
            }
            catch (err) {
                console.log("QuizzService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting quizzes',
                }, 500);
            }
        });
    }
    findAllByCampaing(campaingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let listToReturn = [];
                const quizzObj = new quizz_dto_1.QuizzListDTO();
                const quizzList = yield this.quizzRepository.find({
                    relations: ["question"],
                    where: { campaing: campaingId },
                    order: { createdAt: 'DESC' }
                });
                quizzList.forEach(tempQuizz => {
                    let pointsSum = 0;
                    quizzObj.quizzId = tempQuizz.id;
                    quizzObj.name = tempQuizz.name;
                    quizzObj.createdAt = moment(tempQuizz.createdAt).format('DD/MMM/YYYY');
                    quizzObj.startedAt = moment(tempQuizz.startedAt).format('DD/MMM/YYYY');
                    quizzObj.finishedAt = moment(tempQuizz.finishedAt).format('DD/MMM/YYYY');
                    quizzObj.isActive = tempQuizz.isActive;
                    quizzObj.isDeleted = tempQuizz.isDeleted;
                    quizzObj.isSend = tempQuizz.isSend;
                    tempQuizz.question.forEach(tempQuestion => {
                        pointsSum += tempQuestion.points;
                    });
                    quizzObj.points = pointsSum;
                    listToReturn.push(quizzObj);
                });
                return listToReturn;
            }
            catch (err) {
                console.log("QuizzService - findAllByCampaing: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting quizzes',
                }, 500);
            }
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzCampaing = yield this.campaingRepository.findOne(createDTO.campaingId);
                let newQuizz = yield this.quizzRepository.create({
                    name: createDTO.name,
                    isActive: false,
                    isDeleted: false,
                    isSend: false,
                    time: 0,
                    points: 0,
                    campaing: quizzCampaing
                });
                yield this.quizzRepository.save(newQuizz);
                return { status: 0 };
            }
            catch (err) {
                console.log("QuizzService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating quizz',
                }, 500);
            }
        });
    }
    send(sendQuizzDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filterQueries = [];
                let quizzToSend = yield this.quizzRepository.findOne(sendQuizzDTO.quizzId, {
                    relations: ["campaing", "campaing.target", "campaing.target.city", "campaing.target.delegation", "campaing.target.colony", "campaing.target.chain", "campaing.target.position", "campaing.target.type"]
                });
                quizzToSend.startedAt = new Date(sendQuizzDTO.startDate);
                quizzToSend.finishedAt = new Date(sendQuizzDTO.finishDate);
                quizzToSend.isSend = true;
                quizzToSend.isActive = true;
                console.log("quizzToSend: ", quizzToSend);
                console.log("quizzCampaing: ", quizzToSend.campaing);
                console.log("quizzCampaingTarget: ", quizzToSend.campaing.target);
                console.log(" ******** ******** ******** ********");
                quizzToSend.campaing.target.forEach(target => {
                    let tempTargetObject = {};
                    if (target.initAge !== null) {
                        tempTargetObject['age'] = typeorm_2.Between(target.initAge, target.finalAge);
                    }
                    if (target.gender !== null) {
                        tempTargetObject['gender'] = target.gender;
                    }
                    if (target.chain !== null) {
                        tempTargetObject['chain'] = target.chain.id;
                    }
                    console.log("tempTargetObject: ", tempTargetObject);
                    if (Object.keys(tempTargetObject).length > 0) {
                        filterQueries.push(tempTargetObject);
                    }
                });
                console.log("filterQueries: ", filterQueries);
                const users = yield this.userRepository.find({
                    select: ["id"],
                    where: filterQueries
                });
                console.log("users: ", users);
                quizzToSend.user = users;
                yield this.quizzRepository.save(quizzToSend);
                return users;
            }
            catch (err) {
                console.log("QuizzService - send: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error sending quizz',
                }, 500);
            }
        });
    }
    findQuizzesByUserCampaing(getQuizzesByUserCampaingDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.quizzRepository.createQueryBuilder("quizz")
                    .innerJoin("quizz.campaing", "campaing", "campaing.id = :campaingId", { campaingId: getQuizzesByUserCampaingDTO.campaingId })
                    .innerJoin("quizz.user", "user", "user.email = :email", { email: getQuizzesByUserCampaingDTO.email })
                    .where("quizz.isActive = :isActive", { isActive: true, isDeleted: false })
                    .getMany();
                return response;
            }
            catch (err) {
                console.log("QuizzService - findQuizzesByUserCampaing: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting quizzes',
                }, 500);
            }
        });
    }
};
QuizzService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(quizz_entity_1.Quizz)),
    __param(1, typeorm_1.InjectRepository(campaing_entity_1.Campaing)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizzService);
exports.QuizzService = QuizzService;
//# sourceMappingURL=quizz.service.js.map