import { Repository } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';
import { CreateQuizzDTO, SendQuizzDTO, QuizzListDTO, GetQuizzesByUserCampaingDTO } from './quizz.dto';
export declare class QuizzService {
    private quizzRepository;
    private campaingRepository;
    private userRepository;
    constructor(quizzRepository: Repository<Quizz>, campaingRepository: Repository<Campaing>, userRepository: Repository<User>);
    findAll(): Promise<Quizz[]>;
    findAllByCampaing(campaingId: number): Promise<QuizzListDTO[]>;
    create(createDTO: CreateQuizzDTO): Promise<any>;
    send(sendQuizzDTO: SendQuizzDTO): Promise<any>;
    findQuizzesByUserCampaing(getQuizzesByUserCampaingDTO: GetQuizzesByUserCampaingDTO): Promise<any>;
    getCampaingUserHistoy(email: string): Promise<any>;
}
