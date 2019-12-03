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
const onesignal_api_client_nest_1 = require("onesignal-api-client-nest");
const onesignal_api_client_core_1 = require("onesignal-api-client-core");
let NotificationService = class NotificationService {
    constructor(oneSignalService) {
        this.oneSignalService = oneSignalService;
    }
    viewNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.oneSignalService.viewNotifications({
                limit: 10,
                offset: 0,
                kind: null
            });
        });
    }
    createNotification(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = new onesignal_api_client_core_1.NotificationByDeviceBuilder()
                    .setIncludePlayerIds(['3f207d12-e074-4fea-8d8a-5b085fabe594'])
                    .notification()
                    .setContents({ en: message })
                    .build();
                for (let index = 0; index < 20; index++) {
                    const input = new onesignal_api_client_core_1.NotificationByDeviceBuilder()
                        .setIncludePlayerIds(['3f207d12-e074-4fea-8d8a-5b085fabe594'])
                        .notification()
                        .setContents({ en: 'PRUEBA ' + index })
                        .build();
                    const notificationResponse = yield this.oneSignalService.createNotification(input);
                }
                return { status: 0 };
            }
            catch (err) {
                console.log('NotificationService - createNotification: ', err);
            }
        });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [onesignal_api_client_nest_1.OneSignalService])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map