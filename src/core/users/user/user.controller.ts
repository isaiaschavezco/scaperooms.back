import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { InviteUserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('invite')
    async create(@Body() inviteUserDTO: InviteUserDTO): Promise<number> {
        return await this.userService.invite(inviteUserDTO);
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    async createUser(): Promise<number> {
        return await this.userService.create();
    }

}
