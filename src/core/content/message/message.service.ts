import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../../users/user/user.entity';
import { StartConversationDTO, CreateMessageDTO, CreateAdminMessageDTO } from './message.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class MessageService {

    constructor(@InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async startConversation(startRequest: StartConversationDTO): Promise<any> {

        try {

            let messageListToReturn = [];

            const userConversation = await this.userRepository.findOne({
                where: { email: startRequest.email }
            });

            let newMessage = await this.messageRepository.create({
                content: 'Buen día, ¿En qué puedo ayudarle?',
                createdAt: moment().tz('America/Mexico_City').format(),
                isAdmin: true,
                user: userConversation
            });

            const registeredMessage = await this.messageRepository.save(newMessage);

            // const messageList = await this.messageRepository.find({
            //     where: { user: userConversation },
            //     order: {
            //         createdAt: "DESC"
            //     }
            // });

            // messageList.forEach(message => {
            let tempMessage = {};
            tempMessage["id"] = registeredMessage.id;
            tempMessage["type"] = registeredMessage.isAdmin ? 'Adviser' : 'client';
            tempMessage["data"] = {
                name: registeredMessage.isAdmin ? 'Asesor' : null,
                date: moment(registeredMessage.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                msn: registeredMessage.content
            };
            messageListToReturn.push(tempMessage);
            // });

            return { session: messageListToReturn };

        } catch (err) {
            console.log("MessageService - startConversation: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error starting conversation',
            }, 500);
        }
    }

    async createMessage(createRequest: CreateMessageDTO): Promise<any> {

        try {

            let messageListToReturn = [];

            const userConversation = await this.userRepository.findOne({
                relations: ["role"],
                where: { email: createRequest.email }
            });

            let newMessage = await this.messageRepository.create({
                content: createRequest.data,
                createdAt: moment().tz('America/Mexico_City').format(),
                isAdmin: false,
                user: userConversation
            });

            await this.messageRepository.save(newMessage);

            const messageList = await this.messageRepository.find({
                where: { user: userConversation },
                order: {
                    createdAt: "ASC"
                }
            });

            messageList.forEach(message => {
                let tempMessage = {};
                tempMessage["id"] = message.id;
                tempMessage["type"] = message.isAdmin ? 'Adviser' : 'client';
                tempMessage["data"] = {
                    name: message.isAdmin ? 'Asesor' : null,
                    date: moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    msn: message.content
                };
                messageListToReturn.push(tempMessage);
            });

            return { session: messageListToReturn };

        } catch (err) {
            console.log("MessageService - createMessage: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error sending message',
            }, 500);
        }
    }

    async createAdminMessage(createRequest: CreateAdminMessageDTO): Promise<any> {

        try {

            let messageListToReturn = [];

            const userConversation = await this.userRepository.findOne({
                relations: ["role"],
                where: { email: createRequest.userEmail }
            });

            let newMessage = await this.messageRepository.create({
                content: createRequest.data,
                createdAt: moment().tz('America/Mexico_City').format(),
                isAdmin: true,
                user: userConversation
            });

            await this.messageRepository.save(newMessage);

            const messageList = await this.messageRepository.find({
                where: { user: userConversation },
                order: {
                    createdAt: "ASC"
                }
            });

            messageList.forEach(message => {
                let tempMessage = {};
                tempMessage["id"] = message.id;
                tempMessage["type"] = message.isAdmin ? 'Adviser' : 'client';
                tempMessage["data"] = {
                    name: message.isAdmin ? 'Asesor' : null,
                    date: moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    msn: message.content
                };
                messageListToReturn.push(tempMessage);
            });

            return { session: messageListToReturn };

        } catch (err) {
            console.log("MessageService - createAdminMessage: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error sending message',
            }, 500);
        }
    }

    async getConversation(email: string): Promise<any> {

        try {

            let messageListToReturn = [];

            const userConversation = await this.userRepository.findOne({
                relations: ["role"],
                where: { email }
            });

            const messageList = await this.messageRepository.find({
                where: { user: userConversation },
                order: {
                    createdAt: "ASC"
                }
            });

            messageList.forEach(message => {
                let tempMessage = {};
                tempMessage["id"] = message.id;
                tempMessage["type"] = message.isAdmin ? 'Adviser' : 'client';
                tempMessage["data"] = {
                    name: message.isAdmin ? 'Asesor' : null,
                    date: moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    msn: message.content
                };
                messageListToReturn.push(tempMessage);
            });

            return { session: messageListToReturn };

        } catch (err) {
            console.log("MessageService - getConversation: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting conversation',
            }, 500);
        }
    }

    async getActiveConversations(): Promise<any> {

        try {

            let messageListToReturn = [];

            const userConversation = await this.userRepository.findOne({
                relations: ["role"],
                where: { role: 1 }
            });

            const messageList = await this.messageRepository.find({
                where: { user: userConversation },
                order: {
                    createdAt: "ASC"
                }
            });

            const activeConversations = await this.messageRepository.createQueryBuilder("msn")
                .distinctOn(["msn.user"])
                // .distinct(true)
                .select(["msn.id", "user.name", "user.lastName", "user.email"])
                .innerJoin("msn.user", "user")
                // .orderBy("msn.createdAt", "ASC")
                .getMany();

            return { conversations: activeConversations };

        } catch (err) {
            console.log("MessageService - getActiveConversations: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting conversations',
            }, 500);
        }
    }

    async closeConversation(email: string): Promise<any> {

        try {

            const userConversation = await this.userRepository.findOne({
                relations: ["role"],
                where: { email }
            });

            const messageList = await this.messageRepository.find({
                where: { user: userConversation },
                order: {
                    createdAt: "ASC"
                }
            });

            await this.messageRepository.remove(messageList);

            return { status: 0 };

        } catch (err) {
            console.log("MessageService - closeConversation: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error closing conversation',
            }, 500);
        }
    }

}
