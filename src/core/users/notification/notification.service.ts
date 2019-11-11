import { Injectable } from '@nestjs/common';
import { OneSignalService } from 'onesignal-api-client-nest';
import { NotificationByDeviceBuilder } from 'onesignal-api-client-core';

@Injectable()
export class NotificationService {

    constructor(private readonly oneSignalService: OneSignalService) { }

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
                .setIncludeExternalUserIds(['externalUserId1', 'externalUserId2'])
                .notification() // .email()
                .setContents({ en: 'My Message' })
                .build();

            const notificationResponse = await this.oneSignalService.createNotification(input);
            return notificationResponse;
        } catch (err) {
            console.log('NotificationService - createNotification: ', err);
        }
    }

}
