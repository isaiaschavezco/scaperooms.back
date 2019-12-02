import { User } from '../user/user.entity';
export declare class Notificacion {
    id: number;
    header: string;
    content: string;
    createdAt: Date;
    user: User[];
}
