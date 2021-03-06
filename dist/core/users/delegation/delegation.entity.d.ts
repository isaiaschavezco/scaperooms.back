import { City } from '../city/city.entity';
import { Colony } from '../colony/colony.entity';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';
export declare class Delegation {
    id: number;
    name: string;
    city: City;
    colony: Colony[];
    user: User[];
    target: Target[];
}
