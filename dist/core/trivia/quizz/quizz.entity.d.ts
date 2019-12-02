import { Question } from '../question/question.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
export declare class Quizz {
    id: number;
    name: string;
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    isSend: boolean;
    points: number;
    time: number;
    question: Question[];
    campaing: Campaing;
    user: User[];
    pointsbyuser: Pointsbyuser[];
}
