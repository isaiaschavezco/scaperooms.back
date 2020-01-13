import { UserService } from './user.service';
import { InviteUserDTO, CreateUserDTO, CreateNAOSUserDTO, CreateDrugStoreUserDTO, UpdateNAOSUserDTO, UpdateDrugStoreUserDTO, ConfirmUserPassword } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(inviteUserDTO: InviteUserDTO): Promise<number>;
    findAllUsers(): Promise<any>;
    findUserDetail(email: any): Promise<any>;
    confirmUserPassword(confirmUserPassword: ConfirmUserPassword): Promise<any>;
    requestPasswordReset(email: any): Promise<any>;
    createUser(createUserDTO: CreateUserDTO): Promise<any>;
    createNAOSUser(createNAOSUserDTO: CreateNAOSUserDTO): Promise<any>;
    createDrugStoreUser(createDrugStoreUserDTO: CreateDrugStoreUserDTO): Promise<any>;
    updateNAOSUser(updateNAOSUserDTO: UpdateNAOSUserDTO): Promise<any>;
    updateDrugStoreUser(updateDrugStoreUserDTO: UpdateDrugStoreUserDTO): Promise<any>;
    deleteUser(email: any): Promise<any>;
    resetUserPoints(): Promise<any>;
}
