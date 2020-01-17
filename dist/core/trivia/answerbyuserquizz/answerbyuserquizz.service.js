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
const answerbyuserquizz_entity_1 = require("./answerbyuserquizz.entity");
const quizz_entity_1 = require("../quizz/quizz.entity");
const pointsbyuser_entity_1 = require("../pointsbyuser/pointsbyuser.entity");
const user_entity_1 = require("../../users/user/user.entity");
const points_type_entity_1 = require("../points-type/points-type.entity");
let AnswerbyuserquizzService = class AnswerbyuserquizzService {
    constructor(answerbyuserquizzRepository, quizzRepository, userRepository, pointsbyuserRepository, pointsTypeRepository) {
        this.answerbyuserquizzRepository = answerbyuserquizzRepository;
        this.quizzRepository = quizzRepository;
        this.userRepository = userRepository;
        this.pointsbyuserRepository = pointsbyuserRepository;
        this.pointsTypeRepository = pointsTypeRepository;
    }
    setUserAnswer(setUserAnswers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzSelected = yield this.quizzRepository.findOne(setUserAnswers.id, {
                    relations: ["campaing"]
                });
                const userSelected = yield this.userRepository.findOne({
                    where: { email: setUserAnswers.email }
                });
                const quizzPointsType = yield this.pointsTypeRepository.findOne(quizzSelected.campaing.isBiodermaGame ? 2 : 1);
                const newUserAnswer = this.answerbyuserquizzRepository.create({
                    answer: JSON.stringify(setUserAnswers.answers),
                    points: setUserAnswers.points,
                    isActive: true,
                    quizz: quizzSelected,
                    user: userSelected
                });
                const newPointsByUSer = this.pointsbyuserRepository.create({
                    points: setUserAnswers.points,
                    isAdded: true,
                    isDeleted: false,
                    user: userSelected,
                    quizz: quizzSelected,
                    pointsType: quizzPointsType
                });
                yield this.answerbyuserquizzRepository.save(newUserAnswer);
                return { status: 0 };
            }
            catch (err) {
                console.log("AnswerbyuserquizzService - setUserAnswer: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error setting user answer',
                }, 500);
            }
        });
    }
    setUserAnswerByquestion(setUserAnswersByQuestion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userAnswering = yield this.userRepository.findOne({
                    where: { email: setUserAnswersByQuestion.email }
                });
                const quizzAnswering = yield this.quizzRepository.findOne(setUserAnswersByQuestion.quizzId, {
                    relations: ["campaing"]
                });
                const userResponse = JSON.parse(setUserAnswersByQuestion.userResponse);
                if (setUserAnswersByQuestion.isFirstQuestion) {
                    let newAnswerByUser = this.answerbyuserquizzRepository.create({
                        answer: JSON.stringify([{
                                questionId: setUserAnswersByQuestion.questionId,
                                response: userResponse
                            }]),
                        points: setUserAnswersByQuestion.points,
                        isActive: true,
                        user: userAnswering,
                        quizz: quizzAnswering
                    });
                    yield this.answerbyuserquizzRepository.save(newAnswerByUser);
                }
                if (setUserAnswersByQuestion.isFirstQuestion === false && setUserAnswersByQuestion.isLastQuestion === false) {
                    let answerByUserToUpdate = yield this.answerbyuserquizzRepository.findOne({
                        where: { user: userAnswering, quizz: quizzAnswering, isActive: true }
                    });
                    answerByUserToUpdate.points += setUserAnswersByQuestion.points;
                    let userResponseToUpdate = JSON.parse(answerByUserToUpdate.answer);
                    userResponseToUpdate.push({
                        questionId: setUserAnswersByQuestion.questionId,
                        response: userResponse
                    });
                    answerByUserToUpdate.answer = JSON.stringify(userResponseToUpdate);
                    yield this.answerbyuserquizzRepository.save(answerByUserToUpdate);
                }
                if (setUserAnswersByQuestion.isLastQuestion === true) {
                    let answerByUserToUpdate = yield this.answerbyuserquizzRepository.findOne({
                        where: { user: userAnswering, quizz: quizzAnswering, isActive: true }
                    });
                    answerByUserToUpdate.points += setUserAnswersByQuestion.points;
                    let userResponseToUpdate = JSON.parse(answerByUserToUpdate.answer);
                    userResponseToUpdate.push({
                        questionId: setUserAnswersByQuestion.questionId,
                        response: userResponse
                    });
                    answerByUserToUpdate.answer = JSON.stringify(userResponseToUpdate);
                    answerByUserToUpdate.isActive = false;
                    const newUserAnswer = yield this.answerbyuserquizzRepository.save(answerByUserToUpdate);
                    const quizzPointsType = yield this.pointsTypeRepository.findOne(quizzAnswering.campaing.isBiodermaGame ? 2 : 1);
                    const newPointsByUSer = this.pointsbyuserRepository.create({
                        points: newUserAnswer.points,
                        isAdded: true,
                        isDeleted: false,
                        user: userAnswering,
                        quizz: quizzAnswering,
                        pointsType: quizzPointsType
                    });
                    yield this.pointsbyuserRepository.save(newPointsByUSer);
                    if (quizzAnswering.campaing.isBiodermaGame) {
                        userAnswering.biodermaGamePoints += newUserAnswer.points;
                    }
                    else {
                        userAnswering.points += newUserAnswer.points;
                    }
                    yield this.userRepository.save(userAnswering);
                }
                return { status: 0 };
            }
            catch (err) {
                console.log("AnswerbyuserquizzService - setUserAnswerByquestion: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error setting user answer',
                }, 500);
            }
        });
    }
};
AnswerbyuserquizzService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(answerbyuserquizz_entity_1.Answerbyuserquizz)),
    __param(1, typeorm_1.InjectRepository(quizz_entity_1.Quizz)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(3, typeorm_1.InjectRepository(pointsbyuser_entity_1.Pointsbyuser)),
    __param(4, typeorm_1.InjectRepository(points_type_entity_1.PointsType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnswerbyuserquizzService);
exports.AnswerbyuserquizzService = AnswerbyuserquizzService;
//# sourceMappingURL=answerbyuserquizz.service.js.map