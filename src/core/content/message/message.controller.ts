import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { StartConversationDTO, CreateMessageDTO, CreateAdminMessageDTO } from './message.dto';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService) { }

    @Post('user/start')
    async startConversation(@Body() startConversationDTO: StartConversationDTO): Promise<any> {
        return await this.messageService.startConversation(startConversationDTO);
    }

    @Post('user')
    async sendMessage(@Body() createMessageDTO: CreateMessageDTO): Promise<any> {
        return await this.messageService.createMessage(createMessageDTO);
    }

    @Post('admin')
    async sendAdminMessage(@Body() createAdminMessageDTO: CreateAdminMessageDTO): Promise<any> {
        return await this.messageService.createAdminMessage(createAdminMessageDTO);
    }

    @Get('user/:email')
    async getConversation(@Param('email') email): Promise<any> {
        return await this.messageService.getConversation(email);
    }

    @Get('list')
    async getActiveConversations(): Promise<any> {
        return await this.messageService.getActiveConversations();
    }

    @Delete('user/:email')
    async closeConversation(@Param('email') email): Promise<any> {
        return await this.messageService.closeConversation(email);
    }

}