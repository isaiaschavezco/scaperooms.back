"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const notification_controller_1 = require("./notification.controller");
const notification_service_1 = require("./notification.service");
const onesignal_api_client_nest_1 = require("onesignal-api-client-nest");
const target_entity_1 = require("../../trivia/target/target.entity");
const notificacion_entity_1 = require("./notificacion.entity");
const user_entity_1 = require("../user/user.entity");
const sesion_entity_1 = require("../sesion/sesion.entity");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    common_1.Module({
        imports: [
            onesignal_api_client_nest_1.OneSignalModule.forRootAsync({
                useFactory: () => __awaiter(void 0, void 0, void 0, function* () {
                    return {
                        appId: '',
                        restApiKey: ''
                    };
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([notificacion_entity_1.Notificacion]),
            typeorm_1.TypeOrmModule.forFeature([target_entity_1.Target]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([sesion_entity_1.Sesion])
        ],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService]
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map