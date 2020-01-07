import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../../users/user/user.entity';
import { StartConversationDTO, CreateMessageDTO, CreateAdminMessageDTO } from './message.dto';
export declare class MessageService {
    private messageRepository;
    private userRepository;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>);
    startConversation(startRequest: StartConversationDTO): Promise<any>;
    createMessage(createRequest: CreateMessageDTO): Promise<any>;
    createAdminMessage(createRequest: CreateAdminMessageDTO): Promise<any>;
    getConversation(email: string): Promise<any>;
    getActiveConversations(): Promise<any>;
    closeConversation(email: string): Promise<any>;
}
