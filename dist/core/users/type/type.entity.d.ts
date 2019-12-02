import { Token } from '../token/token.entity';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';
export declare class Type {
    id: number;
    name: string;
    token: Token[];
    user: User[];
    target: Target[];
}
