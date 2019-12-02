import { UserService } from './user.service';
import { User } from './user.entity';
import { InviteUserDTO, CreateUserDTO, CreateNAOSUserDTO, CreateDrugStoreUserDTO } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(inviteUserDTO: InviteUserDTO): Promise<number>;
    findAllUsers(): Promise<User[]>;
    createUser(createUserDTO: CreateUserDTO): Promise<any>;
    createNAOSUser(createNAOSUserDTO: CreateNAOSUserDTO): Promise<any>;
    createDrugStoreUser(createDrugStoreUserDTO: CreateDrugStoreUserDTO): Promise<any>;
}
