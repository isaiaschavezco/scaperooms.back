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

    async findAllByQuizz(quizzId: number): Promise<Question[]> {
        try {
            const questionList = await this.questionRepository.find({
                where: { quizz: quizzId },
                relations: ["question_type"],
                order: { createdAt: 'DESC' }
            });
            return questionList;
        } catch (err) {
            console.log("QuizzService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting quizzes',
            }, 500);
        }
    }

    async create(createDTO: CreateQuestionDTO): Promise<any> {
        try {
            const questionType = await this.questionTypeRepository.findOne(createDTO.questionType);
            const quizzId = await this.quizzRepository.findOne(createDTO.quizzId);

            let newQuestion = await this.questionRepository.create({
                content: createDTO.content,
                answer: createDTO.answer,
                points: createDTO.points,
                time: createDTO.time,
                question_type: questionType,
                quizz: quizzId
            });

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