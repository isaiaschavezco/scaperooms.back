import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';
export declare class Chain {
    id: number;
    name: string;
    isDeleted: boolean;
    user: User[];
    target: Target[];
}
