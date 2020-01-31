import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { OneSignalService } from 'onesignal-api-client-nest';
import { NotificationByDeviceBuilder, NotificationBySegmentBuilder } from 'onesignal-api-client-core';
import { Notificacion } from './notificacion.entity';
import { Target } from '../../trivia/target/target.entity';
import { User } from '../user/user.entity';
import { Sesion } from '../sesion/sesion.entity';
import { CreateNotificationDTO } from './notification.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class NotificationService {

    constructor(private readonly oneSignalService: OneSignalService,
        @InjectRepository(Notificacion) private notificationRepository: Repository<Notificacion>,
        @InjectRepository(Target) private targetRepository: Repository<Target>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Sesion) private sesionRepository: Repository<Sesion>) { }

    async viewNotifications() {
        return await this.oneSignalService.viewNotifications({
            limit: 10,
            offset: 0,
            kind: null
        });
    }

    async createNotification(message: string) {
        try {
            const input = new NotificationByDeviceBuilder()
                .setIncludePlayerIds(['3f207d12-e074-4fea-8d8a-5b085fabe594'])
                .notification() // .email()
                .setContents({ en: message })
                .build();

            for (let index = 0; index < 20; index++) {

                const input = new NotificationByDeviceBuilder()
                    .setIncludePlayerIds(['3f207d12-e074-4fea-8d8a-5b085fabe594'])
                    .notification() // .email()
                    .setContents({ en: 'PRUEBA ' + index })
                    .build();

                const notificationResponse = await this.oneSignalService.createNotification(input);

            }


            return { status: 0 };
        } catch (err) {
            console.log('NotificationService - createNotification: ', err);
        }
    }

    async getNotificationList() {
        try {

            let notificationToReturn = [];

            const notificationList = await this.notificationRepository.find({
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
                    createdAt: moment(notification.createdAt).format('DD/MM/YYYY HH:mm:ss')
                });
            });

            return { notificacions: notificationToReturn };

        } catch (err) {
            console.log("NotificationService - getNotificationList: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting notifications',
            }, 500);
        }
    }

    async getNotificationListByUser(email: string) {
        try {

            let notificationToReturn = [];

            const notificationList = await this.notificationRepository.createQueryBuilder("not")
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
                    createdAt: moment(notification.createdAt).format('DD/MM/YYYY HH:mm:ss')
                });
            });

            return { notificacions: notificationToReturn };

        } catch (err) {
            console.log("NotificationService - getNotificationListByUser: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting notifications',
            }, 500);
        }
    }

    async send(sendRequest: CreateNotificationDTO) {
        try {

            let filterQueries = [];
            let userIds = [];
            let playerIds = [];
            let notificationToAllUsers = false;

            let newNotification = await this.notificationRepository.create({
                content: sendRequest.content,
                header: sendRequest.title,
                createdAt: moment().tz('America/Mexico_City').format()
            });

            const notificationTargets = await this.targetRepository.findByIds(sendRequest.targets, {
                relations: ["city", "chain", "position", "type"]
            });

            notificationTargets.forEach(target => {

                let tempTargetObject = {};

                //Notificaciones a todos los usuarios
                if (target.allUsers) {
                    notificationToAllUsers = true;
                }

                //Notificaciones por filtro
                if (target.initAge !== null) {
                    tempTargetObject['age'] = Between(target.initAge, target.finalAge);
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

            let usersToSend;

            if (notificationToAllUsers) {
                usersToSend = await this.userRepository.find({
                    select: ["id"]
                });
            } else {
                usersToSend = await this.userRepository.find({
                    select: ["id"],
                    where: filterQueries
                });
            }

            newNotification.user = usersToSend;

            await this.notificationRepository.save(newNotification);

            usersToSend.forEach(user => {
                userIds.push(user.id);
            });

            // console.log("userIds: ", userIds);

            const activeSessions = await this.sesionRepository.find({
                user: In(userIds)
            });

            activeSessions.forEach(sesion => {
                if (sesion.playerId) {
                    playerIds.push(sesion.playerId);
                }
            });

            const input = new NotificationByDeviceBuilder()
                .setIncludePlayerIds(playerIds)
                .notification() // .email()
                .setHeadings({ en: sendRequest.title })
                .setContents({ en: sendRequest.content })
                .build();

            await this.oneSignalService.createNotification(input);

            return { status: 0 };
        } catch (err) {
            console.log("NotificationService - send: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error sending notification',
            }, 500);
        }
    }

}
