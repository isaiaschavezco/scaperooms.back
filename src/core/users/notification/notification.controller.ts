import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDTO } from '../../users/notification/notification.dto';

@Controller('notification')
export class NotificationController {

    constructor(private notificationService: NotificationService) { }

    @Get()
    async getAllNotification(): Promise<any> {
        return await this.notificationService.viewNotifications();
    }

    @Post()
    async createNotification(): Promise<any> {
        return await this.notificationService.createNotification('Notificacion desde API 4');
    }

    @Get('list')
    async getListNotification(): Promise<any> {
        return await this.notificationService.getNotificationList();
    }

    @Post('send')
    async sendNotification(@Body() createNotificationDTO: CreateNotificationDTO): Promise<any> {
        return await this.notificationService.send(createNotificationDTO);
    }

}
