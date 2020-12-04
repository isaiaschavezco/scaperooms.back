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
const onesignal_api_client_nest_1 = require("onesignal-api-client-nest");
const onesignal_api_client_core_1 = require("onesignal-api-client-core");
const notificacion_entity_1 = require("./notificacion.entity");
const target_entity_1 = require("../../trivia/target/target.entity");
const user_entity_1 = require("../user/user.entity");
const sesion_entity_1 = require("../sesion/sesion.entity");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
let NotificationService = class NotificationService {
    constructor(oneSignalService, notificationRepository, targetRepository, userRepository, sesionRepository) {
        this.oneSignalService = oneSignalService;
        this.notificationRepository = notificationRepository;
        this.targetRepository = targetRepository;
        this.userRepository = userRepository;
        this.sesionRepository = sesionRepository;
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
    getNotificationList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let notificationToReturn = [];
                const notificationList = yield this.notificationRepository.find({
                    take: 10,
                    order: {
                        createdAt: "DESC"
                    }
                });
                notificationList.forEach(notification => {
                    notificationToReturn.push({
                        id: notification.id,
                        header: notification.header,
                        content: notification.content,
                        createdAt: moment(notification.createdAt).tz('America/Mexico_City').format('DD/MM/YYYY HH:mm:ss')
                    });
                });
                return { notificacions: notificationToReturn };
            }
            catch (err) {
                console.log("NotificationService - getNotificationList: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting notifications',
                }, 500);
            }
        });
    }
    getNotificationListByUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let notificationToReturn = [];
                const notificationList = yield this.notificationRepository.createQueryBuilder("not")
                    .select(["not.id", "not.header", "not.content", "not.createdAt"])
                    .innerJoin("not.user", "user")
                    .where("user.email = :userEmail", { userEmail: email })
                    .orderBy("not.createdAt", "DESC")
                    .take(10)
                    .getMany();
                notificationList.forEach(notification => {
                    notificationToReturn.push({
                        id: notification.id,
                        header: notification.header,
                        content: notification.content,
                        createdAt: moment(notification.createdAt).tz('America/Mexico_City').format('DD/MM/YYYY HH:mm:ss')
                    });
                });
                return { notificacions: notificationToReturn };
            }
            catch (err) {
                console.log("NotificationService - getNotificationListByUser: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting notifications',
                }, 500);
            }
        });
    }
    send(sendRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                const userExist = yield this.userRepository.findOne({
                    where: { email: sendRequest.email },
                    select: ["id", "name", "email", "password"]
                });
                if (userExist) {
                    const match = yield bcrypt.compare(sendRequest.password, userExist.password);
                    if (match) {
                        let filterQueries = [];
                        let userIds = [];
                        let playerIds = [];
                        let notificationToAllUsers = false;
                        let newNotification = yield this.notificationRepository.create({
                            content: sendRequest.content,
                            header: sendRequest.title,
                            createdAt: moment().tz('America/Mexico_City').format()
                        });
                        const notificationTargets = yield this.targetRepository.findByIds(sendRequest.targets, {
                            relations: ["city", "chain", "position", "type", "delegation"]
                        });
                        notificationTargets.forEach(target => {
                            let tempTargetObject = {};
                            if (target.allUsers) {
                                notificationToAllUsers = true;
                            }
                            if (target.initAge !== null) {
                                tempTargetObject['age'] = typeorm_2.Between(target.initAge, target.finalAge);
                            }
                            if (target.gender !== null) {
                                tempTargetObject['gender'] = target.gender;
                            }
                            if (target.chain !== null) {
                                tempTargetObject['chain'] = target.chain.id;
                            }
                            if (target.city !== null) {
                                tempTargetObject['city'] = target.city.id;
                            }
                            if (target.delegation !== null) {
                                tempTargetObject['delegation'] = target.delegation.id;
                            }
                            if (target.position !== null) {
                                tempTargetObject['position'] = target.position.id;
                            }
                            if (target.type !== null) {
                                tempTargetObject['type'] = target.type.id;
                            }
                            if (Object.keys(tempTargetObject).length > 0) {
                                filterQueries.push(tempTargetObject);
                            }
                        });
                        let usersToSendArray = [];
                        console.log("notificationToAllUsers? :", notificationToAllUsers);
                        if (notificationToAllUsers) {
                            let usersToSendTemp = yield this.userRepository.find({
                                select: ["id"]
                            });
                            usersToSendArray.push(usersToSendTemp);
                        }
                        else {
                            yield Promise.all(filterQueries.map((filterQuery) => __awaiter(this, void 0, void 0, function* () {
                                let usersToSendTemp = yield this.userRepository.find({
                                    select: ["id"],
                                    where: filterQuery
                                });
                                console.log("usersToSendTemp", usersToSendTemp);
                                usersToSendArray.push(usersToSendTemp);
                                console.log("FILTER:", filterQuery);
                                console.log("usersToSendARRAY", usersToSendArray);
                            })));
                        }
                        yield Promise.all(usersToSendArray.map((usersToSend) => __awaiter(this, void 0, void 0, function* () {
                            newNotification.user = usersToSend;
                            console.log("USERS TO SEND: ", usersToSend);
                            yield this.notificationRepository.save(newNotification);
                            usersToSend.forEach(user => {
                                userIds.push(user.id);
                            });
                            console.log("userIds: ", userIds, " ", userIds.length);
                            const activeSessions = yield this.sesionRepository.find({
                                user: typeorm_2.In(userIds)
                            });
                            console.log("activeSessions", activeSessions, " ", activeSessions.length);
                            activeSessions.forEach(sesion => {
                                if (sesion.playerId) {
                                    playerIds.push(sesion.playerId);
                                }
                            });
                            console.log("playerIds:", playerIds, " ", playerIds.length);
                            const input = new onesignal_api_client_core_1.NotificationByDeviceBuilder()
                                .setIncludePlayerIds(playerIds)
                                .notification()
                                .setHeadings({ en: sendRequest.title })
                                .setContents({ en: sendRequest.content })
                                .build();
                            console.log("INPUT", input);
                            const ones = yield this.oneSignalService.createNotification(input);
                            console.log("ONE SIGNAL:", ones);
                        })));
                    }
                    else {
                        response = { status: 2 };
                    }
                }
                else {
                    response = { status: 1 };
                }
                return response;
            }
            catch (err) {
                console.log("NotificationService - send: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error sending notification',
                }, 500);
            }
        });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(notificacion_entity_1.Notificacion)),
    __param(2, typeorm_1.InjectRepository(target_entity_1.Target)),
    __param(3, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(4, typeorm_1.InjectRepository(sesion_entity_1.Sesion)),
    __metadata("design:paramtypes", [onesignal_api_client_nest_1.OneSignalService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map