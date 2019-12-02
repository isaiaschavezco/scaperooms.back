import { User } from '../../users/user/user.entity';
export declare class Message {
    id: number;
    content: string;
    createdAt: Date;
    isAdmin: boolean;
    user: User;
}
