import { UserService } from './user.service';
import { User } from './user.entity';
import { InviteUserDTO, CreateUserDTO } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(inviteUserDTO: InviteUserDTO): Promise<number>;
    findAllUsers(): Promise<User[]>;
    createUser(createUserDTO: CreateUserDTO): Promise<any>;
}
