import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { InviteUserDTO, CreateUserDTO, CreateNAOSUserDTO, CreateDrugStoreUserDTO, UpdateNAOSUserDTO, UpdateDrugStoreUserDTO, ConfirmUserPassword, PasswordRecovery } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('invite')
    async create(@Body() inviteUserDTO: InviteUserDTO): Promise<number> {
        return await this.userService.invite(inviteUserDTO);
    }

    @Get()
    async findAllUsers(): Promise<any> {
        return await this.userService.findAll();
    }

    @Get('report/:userType')
    async getReport(@Param('userType') userType): Promise<any> {
        return await this.userService.generateReport(userType);
    }

    @Get(':email')
    async findUserDetail(@Param('email') email): Promise<any> {
        return await this.userService.findUserDetail(email);
    }

    @Get('points/:email')
    async getUserPoints(@Param('email') email): Promise<any> {
        return await this.userService.getUserPoints(email);
    }

    @Post('confirm')
    async confirmUserPassword(@Body() confirmUserPassword: ConfirmUserPassword): Promise<any> {
        return await this.userService.confirmPassword(confirmUserPassword);
    }

    @Get('requestreset/:email')
    async requestPasswordReset(@Param('email') email): Promise<any> {
        return await this.userService.requestPasswordReset(email);
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO): Promise<any> {
        return await this.userService.create(createUserDTO);
    }

    @Post('naos')
    async createNAOSUser(@Body() createNAOSUserDTO: CreateNAOSUserDTO): Promise<any> {
        return await this.userService.createNAOS(createNAOSUserDTO);
    }

    @Post('drugstore')
    async createDrugStoreUser(@Body() createDrugStoreUserDTO: CreateDrugStoreUserDTO): Promise<any> {
        return await this.userService.createDrugStore(createDrugStoreUserDTO);
    }

    @Put('naos')
    async updateNAOSUser(@Body() updateNAOSUserDTO: UpdateNAOSUserDTO): Promise<any> {
        return await this.userService.updateNAOS(updateNAOSUserDTO);
    }

    @Put('drugstore')
    async updateDrugStoreUser(@Body() updateDrugStoreUserDTO: UpdateDrugStoreUserDTO): Promise<any> {
        return await this.userService.updateDrugStore(updateDrugStoreUserDTO);
    }

    @Delete(':email')
    async deleteUser(@Param('email') email): Promise<any> {
        return await this.userService.deleteUser(email);
    }

    @Put('resetpoints')
    async resetUserPoints(): Promise<any> {
        return await this.userService.resetUserPoints();
    }

    @Put('recovery')
    async recoveryPassword(@Body() passwordRecovery: PasswordRecovery): Promise<any> {
        return await this.userService.passwordRecovery(passwordRecovery);
    }

}
