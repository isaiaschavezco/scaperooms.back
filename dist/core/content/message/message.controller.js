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
const message_service_1 = require("./message.service");
const message_gateway_1 = require("./message.gateway");
const message_user_gateway_1 = require("./message_user.gateway");
const message_dto_1 = require("./message.dto");
let MessageController = class MessageController {
    constructor(messageService, msgGateway, msgUserGateway) {
        this.messageService = messageService;
        this.msgGateway = msgGateway;
        this.msgUserGateway = msgUserGateway;
    }
    startConversation(startConversationDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageService.startConversation(startConversationDTO);
        });
    }
    sendMessage(createMessageDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            this.msgGateway.sentToAll(createMessageDTO.email);
            return yield this.messageService.createMessage(createMessageDTO);
        });
    }
    sendAdminMessage(createAdminMessageDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            this.msgUserGateway.sentToAll(createAdminMessageDTO.userEmail);
            return yield this.messageService.createAdminMessage(createAdminMessageDTO);
        });
    }
    getConversation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageService.getConversation(email);
        });
    }
    getActiveConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageService.getActiveConversations();
        });
    }
    closeConversation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageService.closeConversation(email);
        });
    }
};
__decorate([
    common_1.Post('user/start'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.StartConversationDTO]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "startConversation", null);
__decorate([
    common_1.Post('user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.CreateMessageDTO]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "sendMessage", null);
__decorate([
    common_1.Post('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.CreateAdminMessageDTO]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "sendAdminMessage", null);
__decorate([
    common_1.Get('user/:email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getConversation", null);
__decorate([
    common_1.Get('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getActiveConversations", null);
__decorate([
    common_1.Delete('user/:email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "closeConversation", null);
MessageController = __decorate([
    common_1.Controller('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        message_gateway_1.MessageGateway,
        message_user_gateway_1.MessageUserGateway])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map