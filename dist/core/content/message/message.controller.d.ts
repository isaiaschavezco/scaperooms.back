import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageUserGateway } from './message_user.gateway';
import { StartConversationDTO, CreateMessageDTO, CreateAdminMessageDTO } from './message.dto';
export declare class MessageController {
    private messageService;
    private msgGateway;
    private msgUserGateway;
    constructor(messageService: MessageService, msgGateway: MessageGateway, msgUserGateway: MessageUserGateway);
    startConversation(startConversationDTO: StartConversationDTO): Promise<any>;
    sendMessage(createMessageDTO: CreateMessageDTO): Promise<any>;
    sendAdminMessage(createAdminMessageDTO: CreateAdminMessageDTO): Promise<any>;
    getConversation(email: any): Promise<any>;
    getActiveConversations(): Promise<any>;
    closeConversation(email: any): Promise<any>;
}
