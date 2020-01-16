import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionDTO } from './question.dto';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    getAllQuizzes(): Promise<Question[]>;
    getAllByCampaing(quizzId: any): Promise<any>;
    getQuestionDetailById(questionId: any): Promise<any>;
    getAllByUserQuizz(quizzId: any): Promise<any>;
    createQuizz(createQuestionDTO: CreateQuestionDTO): Promise<any>;
}
