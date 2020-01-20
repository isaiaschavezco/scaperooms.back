import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionDTO, UpdateQuestionDTO } from './question.dto';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    getAllQuestions(): Promise<Question[]>;
    getAllByCampaing(quizzId: any): Promise<any>;
    getQuestionDetailById(questionId: any): Promise<any>;
    getAllByUserQuizz(quizzId: any): Promise<any>;
    createQuestion(createQuestionDTO: CreateQuestionDTO): Promise<any>;
    updateQuestion(updateQuestionDTO: UpdateQuestionDTO): Promise<any>;
}
