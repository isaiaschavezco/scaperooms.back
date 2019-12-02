import { Delegation } from '../delegation/delegation.entity';
import { User } from '../user/user.entity';
export declare class Colony {
    id: number;
    name: string;
    delegation: Delegation;
    user: User[];
}
