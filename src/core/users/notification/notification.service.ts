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

}
