import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionType } from '../question-type/question-type.entity';
import { Quizz } from '../quizz/quizz.entity';
import { CreateQuestionDTO } from './question.dto';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(QuestionType) private questionTypeRepository: Repository<QuestionType>,
        @InjectRepository(Quizz) private quizzRepository: Repository<Quizz>) { }

    async findAll(): Promise<Question[]> {
        try {
            const questionList = await this.questionRepository.find();
            return questionList;
        } catch (err) {
            console.log("QuestionService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting questions',
            }, 500);
        }
    }

    async findAllByQuizz(quizzId: number): Promise<any> {
        try {

            const questionList = await this.questionRepository.find({
                where: { quizz: quizzId },
                relations: ["question_type"],
                order: { createdAt: 'DESC' }
            });

            const quizzSelected = await this.quizzRepository.findOne(quizzId);

            return { totalPoints: quizzSelected.points, totalTime: quizzSelected.time, questions: questionList };
        } catch (err) {
            console.log("QuizzService - findAllByQuizz: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting quizzes',
            }, 500);
        }
    }

    async findAllByUserQuizz(quizzId: number): Promise<any> {
        try {

            let questionListToReturn = [];

            const questionList = await this.questionRepository.find({
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

            const quizzSelected = await this.quizzRepository.findOne(quizzId);

            return {
                quizz: { id: quizzSelected.id, name: quizzSelected.name, time: quizzSelected.time, points: quizzSelected.points, totalQuestions: questionList.length },
                questions: questionListToReturn
            };
        } catch (err) {
            console.log("QuizzService - findAllByUserQuizz: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting quizzes',
            }, 500);
        }
    }

    async create(createDTO: CreateQuestionDTO): Promise<any> {
        try {
            const questionType = await this.questionTypeRepository.findOne(createDTO.questionType);
            let quizz = await this.quizzRepository.findOne(createDTO.quizzId);

            let newQuestion = await this.questionRepository.create({
                content: createDTO.content,
                answer: createDTO.answer,
                points: createDTO.points,
                time: createDTO.time,
                question_type: questionType,
                quizz: quizz
            });

            quizz.points += createDTO.points;
            quizz.time += createDTO.time;

            await this.quizzRepository.save(quizz);
            await this.questionRepository.save(newQuestion);

            return { status: 0 };
        } catch (err) {
            console.log("QuestionService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating question',
            }, 500);
        }
    }

}