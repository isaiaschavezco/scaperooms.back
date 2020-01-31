"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./message.entity");
const user_entity_1 = require("../../users/user/user.entity");
const moment = require("moment-timezone");
let MessageService = class MessageService {
    constructor(messageRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    startConversation(startRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageListToReturn = [];
                const userConversation = yield this.userRepository.findOne({
                    where: { email: startRequest.email }
                });
                let newMessage = yield this.messageRepository.create({
                    content: 'Buen día, ¿En qué puedo ayudarle?',
                    createdAt: moment().tz('America/Mexico_City').format(),
                    isAdmin: true,
                    user: userConversation
                });
                const registeredMessage = yield this.messageRepository.save(newMessage);
                let tempMessage = {};
                tempMessage["id"] = registeredMessage.id;
                tempMessage["type"] = registeredMessage.isAdmin ? 'Adviser' : 'client';
                tempMessage["data"] = {
                    name: registeredMessage.isAdmin ? 'Asesor' : null,
                    date: moment(registeredMessage.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    msn: registeredMessage.content
                };
                messageListToReturn.push(tempMessage);
                return { session: messageListToReturn };
            }
            catch (err) {
                console.log("MessageService - startConversation: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error starting conversation',
                }, 500);
            }
        });
    }
    createMessage(createRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageListToReturn = [];
                const userConversation = yield this.userRepository.findOne({
                    relations: ["role"],
                    where: { email: createRequest.email }
                });
                let newMessage = yield this.messageRepository.create({
                    content: createRequest.data,
                    createdAt: moment().tz('America/Mexico_City').format(),
                    isAdmin: false,
                    user: userConversation
                });
                yield this.messageRepository.save(newMessage);
                const messageList = yield this.messageRepository.find({
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
            }
            catch (err) {
                console.log("MessageService - createMessage: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error sending message',
                }, 500);
            }
        });
    }
    createAdminMessage(createRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageListToReturn = [];
                const userConversation = yield this.userRepository.findOne({
                    relations: ["role"],
                    where: { email: createRequest.userEmail }
                });
                let newMessage = yield this.messageRepository.create({
                    content: createRequest.data,
                    createdAt: moment().tz('America/Mexico_City').format(),
                    isAdmin: true,
                    user: userConversation
                });
                yield this.messageRepository.save(newMessage);
                const messageList = yield this.messageRepository.find({
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
            }
            catch (err) {
                console.log("MessageService - createAdminMessage: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error sending message',
                }, 500);
            }
        });
    }
    getConversation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageListToReturn = [];
                const userConversation = yield this.userRepository.findOne({
                    relations: ["role"],
                    where: { email }
                });
                const messageList = yield this.messageRepository.find({
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
            }
            catch (err) {
                console.log("MessageService - getConversation: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting conversation',
                }, 500);
            }
        });
    }
    getActiveConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageListToReturn = [];
                const userConversation = yield this.userRepository.findOne({
                    relations: ["role"],
                    where: { role: 1 }
                });
                const messageList = yield this.messageRepository.find({
                    where: { user: userConversation },
                    order: {
                        createdAt: "ASC"
                    }
                });
                const activeConversations = yield this.messageRepository.createQueryBuilder("msn")
                    .distinctOn(["msn.user"])
                    .select(["msn.id", "user.name", "user.lastName", "user.email"])
                    .innerJoin("msn.user", "user")
                    .getMany();
                return { conversations: activeConversations };
            }
            catch (err) {
                console.log("MessageService - getActiveConversations: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting conversations',
                }, 500);
            }
        });
    }
    closeConversation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userConversation = yield this.userRepository.findOne({
                    relations: ["role"],
                    where: { email }
                });
                const messageList = yield this.messageRepository.find({
                    where: { user: userConversation },
                    order: {
                        createdAt: "ASC"
                    }
                });
                yield this.messageRepository.remove(messageList);
                return { status: 0 };
            }
            catch (err) {
                console.log("MessageService - closeConversation: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error closing conversation',
                }, 500);
            }
        });
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(message_entity_1.Message)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map