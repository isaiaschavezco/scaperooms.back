import { User } from '../../users/user/user.entity';
import { Quizz } from '../quizz/quizz.entity';
export declare class Answerbyuserquizz {
    id: string;
    answer: string;
    points: number;
    isActive: boolean;
    user: User;
    quizz: Quizz;
}
