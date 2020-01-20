import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionType } from '../question-type/question-type.entity';
import { Quizz } from '../quizz/quizz.entity';
import { CreateQuestionDTO, UpdateQuestionDTO } from './question.dto';
export declare class QuestionService {
    private questionRepository;
    private questionTypeRepository;
    private quizzRepository;
    constructor(questionRepository: Repository<Question>, questionTypeRepository: Repository<QuestionType>, quizzRepository: Repository<Quizz>);
    findAll(): Promise<Question[]>;
    findAllByQuizz(quizzId: number): Promise<any>;
    findAllByUserQuizz(quizzId: number): Promise<any>;
    create(createDTO: CreateQuestionDTO): Promise<any>;
    update(updateDTO: UpdateQuestionDTO): Promise<any>;
    delete(questionId: number): Promise<any>;
    getQuestionDetailById(questionId: number): Promise<any>;
}
