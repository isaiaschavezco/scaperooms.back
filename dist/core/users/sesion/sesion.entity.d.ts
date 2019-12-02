import { User } from '../user/user.entity';
export declare class Sesion {
    id: string;
    loggedInAt: Date;
    playerId: string;
    user: User;
}
