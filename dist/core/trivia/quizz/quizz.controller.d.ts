import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';
import { CreateQuizzDTO, SendQuizzDTO, QuizzListDTO, GetQuizzesByUserCampaingDTO } from './quizz.dto';
export declare class QuizzController {
    private quizzService;
    constructor(quizzService: QuizzService);
    getAllQuizzes(): Promise<Quizz[]>;
    getAllByCampaing(campaingId: any): Promise<QuizzListDTO[]>;
    createQuizz(createQuizzDTO: CreateQuizzDTO): Promise<any>;
    sendQuizz(sendQuizzDTO: SendQuizzDTO): Promise<any>;
    getQuizzesByUserCampaing(getQuizzesByUserCampaingDTO: GetQuizzesByUserCampaingDTO): Promise<any>;
    deleteQuizz(quizzId: any): Promise<any>;
}
