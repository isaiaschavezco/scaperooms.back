import { Delegation } from '../delegation/delegation.entity';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';
export declare class City {
    id: number;
    name: string;
    delegation: Delegation[];
    user: User[];
    target: Target[];
}
