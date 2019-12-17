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
const question_entity_1 = require("./question.entity");
const question_type_entity_1 = require("../question-type/question-type.entity");
const quizz_entity_1 = require("../quizz/quizz.entity");
let QuestionService = class QuestionService {
    constructor(questionRepository, questionTypeRepository, quizzRepository) {
        this.questionRepository = questionRepository;
        this.questionTypeRepository = questionTypeRepository;
        this.quizzRepository = quizzRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questionList = yield this.questionRepository.find();
                return questionList;
            }
            catch (err) {
                console.log("QuestionService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting questions',
                }, 500);
            }
        });
    }
    findAllByQuizz(quizzId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questionList = yield this.questionRepository.find({
                    where: { quizz: quizzId },
                    relations: ["question_type"],
                    order: { createdAt: 'DESC' }
                });
                const quizzSelected = yield this.quizzRepository.findOne(quizzId);
                return { totalPoints: quizzSelected.points, totalTime: quizzSelected.time, questions: questionList };
            }
            catch (err) {
                console.log("QuizzService - findAllByQuizz: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting quizzes',
                }, 500);
            }
        });
    }
    findAllByUserQuizz(quizzId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let questionListToReturn = [];
                const questionList = yield this.questionRepository.find({
                    where: { quizz: quizzId },
                    relations: ["question_type"],
                    order: { createdAt: 'DESC' }
                });
                questionList.forEach(actualQuestion => {
                    let tempQuestion = {};
                    tempQuestion['id'] = actualQuestion.id;
                    tempQuestion['type'] = actualQuestion.question_type.id;
                    tempQuestion['points'] = actualQuestion.points;
                    console.log("CONTENT: ", actualQuestion.content);
                    const questionContent = JSON.parse(actualQuestion.content);
                    const answerContent = JSON.parse(actualQuestion.answer);
                    switch (actualQuestion.question_type.id) {
                        case 1:
                            tempQuestion['question'] = questionContent.question;
                            tempQuestion['possiblesResponses'] = questionContent.possiblesResponses;
                            tempQuestion['response'] = answerContent.response;
                            break;
                        case 2:
                            tempQuestion['question'] = questionContent.question;
                            tempQuestion['possiblesResponses'] = questionContent.possiblesResponses;
                            tempQuestion['response'] = answerContent.response;
                            break;
                        case 3:
                            tempQuestion['question'] = questionContent.question;
                            tempQuestion['possiblesResponses'] = questionContent.possiblesResponses;
                            tempQuestion['response'] = answerContent.response;
                            break;
                        case 4:
                            tempQuestion['unorder'] = questionContent.unorder;
                            tempQuestion['order'] = answerContent.order;
                            break;
                        case 5:
                            tempQuestion['questions'] = questionContent.questions;
                            tempQuestion['responses'] = answerContent.responses;
                            break;
                        default:
                            console.log("Pregunta extraña");
                            break;
                    }
                    questionListToReturn.push(tempQuestion);
                });
                const quizzSelected = yield this.quizzRepository.findOne(quizzId);
                return {
                    quizz: { id: quizzSelected.id, name: quizzSelected.name, time: quizzSelected.time, points: quizzSelected.points, totalQuestions: questionList.length },
                    questions: questionListToReturn
                };
            }
            catch (err) {
                console.log("QuizzService - findAllByUserQuizz: ", err);
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
                const questionType = yield this.questionTypeRepository.findOne(createDTO.questionType);
                let quizz = yield this.quizzRepository.findOne(createDTO.quizzId);
                let newQuestion = yield this.questionRepository.create({
                    content: createDTO.content,
                    answer: createDTO.answer,
                    points: createDTO.points,
                    time: createDTO.time,
                    question_type: questionType,
                    quizz: quizz
                });
                quizz.points += createDTO.points;
                quizz.time += createDTO.time;
                yield this.quizzRepository.save(quizz);
                yield this.questionRepository.save(newQuestion);
                return { status: 0 };
            }
            catch (err) {
                console.log("QuestionService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating question',
                }, 500);
            }
        });
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(question_entity_1.Question)),
    __param(1, typeorm_1.InjectRepository(question_type_entity_1.QuestionType)),
    __param(2, typeorm_1.InjectRepository(quizz_entity_1.Quizz)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map