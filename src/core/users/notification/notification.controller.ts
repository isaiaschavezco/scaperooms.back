import { Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(private notificationService: NotificationService) { }

    @Get()
    async getAllNotification(): Promise<any> {
        return await this.notificationService.viewNotifications();
    }

    @Post()
    async createNotification(): Promise<any> {
        return await this.notificationService.createNotification('Not desde PI');
    }

}
