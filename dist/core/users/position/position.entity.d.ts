import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';
export declare class Position {
    id: number;
    name: string;
    user: User[];
    target: Target[];
}
