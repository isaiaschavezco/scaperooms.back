import { Quizz } from '../quizz/quizz.entity';
import { Target } from '../target/target.entity';
export declare class Campaing {
    id: number;
    name: string;
    portrait: string;
    createdAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    isBiodermaGame: boolean;
    quizz: Quizz[];
    target: Target[];
}
