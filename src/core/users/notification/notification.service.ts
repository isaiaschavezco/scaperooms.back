import { Injectable } from '@nestjs/common';
import { OneSignalService } from 'onesignal-api-client-nest';
import { NotificationByDeviceBuilder, NotificationBySegmentBuilder } from 'onesignal-api-client-core';

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
                .setIncludePlayerIds(['99980eaf-0648-45f5-b70b-bb81e9c5056e'])
                .notification() // .email()
                .setContents({ en: message })
                .build();

            const input2 = new NotificationBySegmentBuilder()
                .setIncludedSegments(['Active Users', 'Inactive Users'])
                .notification() // .email()
                .setContents({ en: message })
                .build();

            const notificationResponse = await this.oneSignalService.createNotification(input);
            return notificationResponse;
        } catch (err) {
            console.log('NotificationService - createNotification: ', err);
        }
    }

}
