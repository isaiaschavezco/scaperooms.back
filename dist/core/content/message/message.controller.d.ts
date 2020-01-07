import { MessageService } from './message.service';
import { StartConversationDTO, CreateMessageDTO, CreateAdminMessageDTO } from './message.dto';
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    startConversation(startConversationDTO: StartConversationDTO): Promise<any>;
    sendMessage(createMessageDTO: CreateMessageDTO): Promise<any>;
    sendAdminMessage(createAdminMessageDTO: CreateAdminMessageDTO): Promise<any>;
    getConversation(email: any): Promise<any>;
    getActiveConversations(): Promise<any>;
    closeConversation(email: any): Promise<any>;
}
