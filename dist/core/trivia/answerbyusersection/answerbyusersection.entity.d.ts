import { User } from '../../users/user/user.entity';
import { Question } from '../question/question.entity';
export declare class Answerbyusersection {
    id: string;
    answer: string;
    points: number;
    isActive: boolean;
    user: User;
    question: Question;
}
