import { NotificationService } from './notification.service';
import { CreateNotificationDTO } from '../../users/notification/notification.dto';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getAllNotification(): Promise<any>;
    createNotification(): Promise<any>;
    getListNotification(): Promise<any>;
    getListNotificationByUser(email: any): Promise<any>;
    sendNotification(createNotificationDTO: CreateNotificationDTO): Promise<any>;
}
