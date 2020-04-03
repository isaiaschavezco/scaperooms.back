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
const pointsbyuser_entity_1 = require("../pointsbyuser/pointsbyuser.entity");
const question_entity_1 = require("../question/question.entity");
const answerbyuserquizz_entity_1 = require("../answerbyuserquizz/answerbyuserquizz.entity");
const quizz_dto_1 = require("./quizz.dto");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
let QuizzService = class QuizzService {
    constructor(quizzRepository, campaingRepository, userRepository, pointsByUserRepository, questionRepository, answerByUserRepository) {
        this.quizzRepository = quizzRepository;
        this.campaingRepository = campaingRepository;
        this.userRepository = userRepository;
        this.pointsByUserRepository = pointsByUserRepository;
        this.questionRepository = questionRepository;
        this.answerByUserRepository = answerByUserRepository;
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
                const quizzList = yield this.quizzRepository.find({
                    relations: ["question"],
                    where: { campaing: campaingId },
                    order: { createdAt: 'DESC' }
                });
                quizzList.forEach(tempQuizz => {
                    let quizzObj = new quizz_dto_1.QuizzListDTO();
                    quizzObj.quizzId = tempQuizz.id;
                    quizzObj.name = tempQuizz.name;
                    quizzObj.createdAt = moment(tempQuizz.createdAt).format('DD/MM/YYYY');
                    quizzObj.startedAt = moment(tempQuizz.startedAt).format('DD/MM/YYYY HH:mm:ss');
                    quizzObj.finishedAt = moment(tempQuizz.finishedAt).format('DD/MM/YYYY HH:mm:ss');
                    quizzObj.isActive = tempQuizz.isActive;
                    quizzObj.isDeleted = tempQuizz.isDeleted;
                    quizzObj.isSend = tempQuizz.isSend;
                    quizzObj.questions = tempQuizz.question.length;
                    quizzObj.points = tempQuizz.points;
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
                console.log("sendQuizzDTO: ", sendQuizzDTO);
                let filterQueries = [];
                let notificationToAllUsers = false;
                let quizzToSend = yield this.quizzRepository.findOne(sendQuizzDTO.quizzId, {
                    relations: ["campaing", "campaing.target", "campaing.target.city", "campaing.target.chain", "campaing.target.position", "campaing.target.type", "campaing.target.role", "campaing.target.delegation"]
                });
                quizzToSend.startedAt = new Date(sendQuizzDTO.startDate);
                quizzToSend.finishedAt = new Date(sendQuizzDTO.finishDate);
                quizzToSend.isSend = true;
                quizzToSend.isActive = true;
                quizzToSend.campaing.target.forEach(target => {
                    let tempTargetObject = {};
                    if (target.allUsers) {
                        notificationToAllUsers = true;
                    }
                    if (target.initAge !== null) {
                        tempTargetObject['age'] = typeorm_2.Between(target.initAge, target.finalAge);
                    }
                    if (target.gender !== null) {
                        tempTargetObject['gender'] = target.gender;
                    }
                    if (target.chain !== null) {
                        tempTargetObject['chain'] = target.chain.id;
                    }
                    if (target.city !== null) {
                        tempTargetObject['city'] = target.city.id;
                    }
                    if (target.delegation !== null) {
                        tempTargetObject['delegation'] = target.delegation.id;
                    }
                    if (target.position !== null) {
                        tempTargetObject['position'] = target.position.id;
                    }
                    if (target.type !== null) {
                        tempTargetObject['type'] = target.type.id;
                    }
                    if (target.role !== null) {
                        tempTargetObject['role'] = target.role.id;
                    }
                    if (Object.keys(tempTargetObject).length > 0) {
                        filterQueries.push(tempTargetObject);
                    }
                });
                let users;
                if (notificationToAllUsers) {
                    users = yield this.userRepository.find({
                        select: ["id"]
                    });
                }
                else {
                    users = yield this.userRepository.find({
                        select: ["id"],
                        where: filterQueries
                    });
                }
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
                const actualDate = moment().tz('America/Mexico_City').format();
                const campaingSelected = yield this.campaingRepository.findOne(getQuizzesByUserCampaingDTO.campaingId, {
                    select: ["id", "name"]
                });
                const user = yield this.userRepository.findOne({
                    where: { email: getQuizzesByUserCampaingDTO.email }
                });
                const response = yield this.quizzRepository.createQueryBuilder("quizz")
                    .leftJoinAndSelect("quizz.answerbyuserquizz", "answ", "answ.user = :userId", { userId: user.id })
                    .innerJoin("quizz.campaing", "campaing", "campaing.id = :campaingId", { campaingId: getQuizzesByUserCampaingDTO.campaingId })
                    .innerJoin("quizz.user", "user", "user.email = :email", { email: getQuizzesByUserCampaingDTO.email })
                    .where("quizz.isActive = :isActive AND quizz.isSend = :isSend AND quizz.isDeleted = :isDeleted", { isActive: true, isSend: true, isDeleted: false })
                    .getMany();
                let quizzListToReturn = [];
                response.forEach(tempQuizz => {
                    let quizzFormat = {};
                    quizzFormat["id"] = tempQuizz.id;
                    quizzFormat["name"] = tempQuizz.name;
                    quizzFormat["finishedAt"] = moment(tempQuizz.finishedAt).format('DD/MM/YYYY');
                    quizzFormat["time"] = tempQuizz.time;
                    quizzFormat["quizzPoints"] = tempQuizz.points;
                    quizzFormat["userPoints"] = tempQuizz.answerbyuserquizz.length > 0 ? tempQuizz.answerbyuserquizz[0].points : 0;
                    quizzFormat["canBeAnswered"] = tempQuizz.answerbyuserquizz.length > 0 ? false : (!moment(actualDate).isAfter(moment(tempQuizz.finishedAt).format()));
                    quizzListToReturn.push(quizzFormat);
                });
                return { campaing: campaingSelected, quizzes: quizzListToReturn };
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
    delete(removeQuizzDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                const userExist = yield this.userRepository.findOne({
                    where: { email: removeQuizzDTO.email },
                    select: ["id", "name", "email", "points", "password"]
                });
                if (userExist) {
                    const match = yield bcrypt.compare(removeQuizzDTO.password, userExist.password);
                    if (match) {
                        let pointsByUserToRemove = yield this.pointsByUserRepository
                            .createQueryBuilder("pobyus")
                            .select(["pobyus.id", "pobyus.points", "pobyus.isAdded", "pobyus.createdAt", "pobyus.isDeleted"])
                            .addSelect("user.id")
                            .leftJoin('pobyus.quizz', 'quizz')
                            .leftJoinAndSelect('pobyus.pointsType', 'poty')
                            .leftJoin('pobyus.user', 'user')
                            .where('quizz.id = :quizzId', { quizzId: removeQuizzDTO.quizzId })
                            .getMany();
                        for (let index = 0; index < pointsByUserToRemove.length; index++) {
                            const tempPointsByUser = pointsByUserToRemove[index];
                            if (tempPointsByUser.points > 0) {
                                let userToChange = yield this.userRepository.findOne(tempPointsByUser.user.id, {
                                    select: ["id", "points", "biodermaGamePoints"]
                                });
                                if (userToChange) {
                                    if (tempPointsByUser.pointsType.id == 2) {
                                        userToChange.biodermaGamePoints -= tempPointsByUser.points;
                                        if (userToChange.biodermaGamePoints <= 0) {
                                            userToChange.biodermaGamePoints = 0;
                                        }
                                    }
                                    else {
                                        userToChange.points -= tempPointsByUser.points;
                                        if (userToChange.points <= 0) {
                                            userToChange.points = 0;
                                        }
                                    }
                                }
                                yield this.userRepository.save(userToChange);
                            }
                        }
                        let questionsToRemove = yield this.questionRepository.find({
                            where: { quizz: removeQuizzDTO.quizzId }
                        });
                        let answerByUserToRemove = yield this.answerByUserRepository.find({
                            where: { quizz: removeQuizzDTO.quizzId }
                        });
                        let quizzToRemove = yield this.quizzRepository.findOne(removeQuizzDTO.quizzId);
                        yield this.questionRepository.remove(questionsToRemove);
                        yield this.answerByUserRepository.remove(answerByUserToRemove);
                        yield this.pointsByUserRepository.remove(pointsByUserToRemove);
                        yield this.quizzRepository.remove(quizzToRemove);
                        response = { status: 0 };
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
                console.log("QuizzService - delete: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error deleting quizzes',
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
    __param(3, typeorm_1.InjectRepository(pointsbyuser_entity_1.Pointsbyuser)),
    __param(4, typeorm_1.InjectRepository(question_entity_1.Question)),
    __param(5, typeorm_1.InjectRepository(answerbyuserquizz_entity_1.Answerbyuserquizz)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizzService);
exports.QuizzService = QuizzService;
//# sourceMappingURL=quizz.service.js.map