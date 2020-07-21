import { Repository } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { Question } from '../question/question.entity';
import { Answerbyuserquizz } from '../answerbyuserquizz/answerbyuserquizz.entity';
import { CreateQuizzDTO, SendQuizzDTO, QuizzListDTO, GetQuizzesByUserCampaingDTO, RemoveQuizzDTO } from './quizz.dto';
export declare class QuizzService {
    private quizzRepository;
    private campaingRepository;
    private userRepository;
    private pointsByUserRepository;
    private questionRepository;
    private answerByUserRepository;
    constructor(quizzRepository: Repository<Quizz>, campaingRepository: Repository<Campaing>, userRepository: Repository<User>, pointsByUserRepository: Repository<Pointsbyuser>, questionRepository: Repository<Question>, answerByUserRepository: Repository<Answerbyuserquizz>);
    findAll(): Promise<Quizz[]>;
    findAllByCampaing(campaingId: number): Promise<QuizzListDTO[]>;
    create(createDTO: CreateQuizzDTO): Promise<any>;
    send(sendQuizzDTO: SendQuizzDTO): Promise<any>;
    findQuizzesByUserCampaing(getQuizzesByUserCampaingDTO: GetQuizzesByUserCampaingDTO): Promise<any>;
    delete(removeQuizzDTO: RemoveQuizzDTO): Promise<any>;
    generateQuizzReport(quizzId: string): Promise<any>;
}
