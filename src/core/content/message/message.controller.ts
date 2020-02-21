import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageUserGateway } from './message_user.gateway';
import { StartConversationDTO, CreateMessageDTO, CreateAdminMessageDTO } from './message.dto';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService,
        private msgGateway: MessageGateway,
        private msgUserGateway: MessageUserGateway) { }

    @Post('user/start')
    async startConversation(@Body() startConversationDTO: StartConversationDTO): Promise<any> {
        return await this.messageService.startConversation(startConversationDTO);
    }

    @Post('user')
    async sendMessage(@Body() createMessageDTO: CreateMessageDTO): Promise<any> {
        this.msgGateway.sentToAll(createMessageDTO.email);
        return await this.messageService.createMessage(createMessageDTO);
    }

    @Post('admin')
    async sendAdminMessage(@Body() createAdminMessageDTO: CreateAdminMessageDTO): Promise<any> {
        this.msgUserGateway.sentToAll(createAdminMessageDTO.userEmail);
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