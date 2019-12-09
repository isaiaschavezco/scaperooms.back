import { Repository } from 'typeorm';
import { Answerbyuserquizz } from './answerbyuserquizz.entity';
import { Quizz } from '../quizz/quizz.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { User } from '../../users/user/user.entity';
import { PointsType } from '../points-type/points-type.entity';
import { SetUserAnswers } from './answerbyuserquizz.dto';
export declare class AnswerbyuserquizzService {
    private answerbyuserquizzRepository;
    private quizzRepository;
    private userRepository;
    private pointsbyuserRepository;
    private pointsTypeRepository;
    constructor(answerbyuserquizzRepository: Repository<Answerbyuserquizz>, quizzRepository: Repository<Quizz>, userRepository: Repository<User>, pointsbyuserRepository: Repository<Pointsbyuser>, pointsTypeRepository: Repository<PointsType>);
    setUserAnswer(setUserAnswers: SetUserAnswers): Promise<any>;
}
