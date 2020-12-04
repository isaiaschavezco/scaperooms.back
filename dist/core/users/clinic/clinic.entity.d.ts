import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';
export declare class Clinic {
    id: number;
    name: string;
    isDeleted: boolean;
    user: User[];
    target: Target[];
}
