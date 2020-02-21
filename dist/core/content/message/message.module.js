"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const user_entity_1 = require("../../users/user/user.entity");
const message_entity_1 = require("../message/message.entity");
const message_gateway_1 = require("./message.gateway");
const message_user_gateway_1 = require("./message_user.gateway");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message]), typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        providers: [message_service_1.MessageService, message_gateway_1.MessageGateway, message_user_gateway_1.MessageUserGateway],
        controllers: [message_controller_1.MessageController]
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map