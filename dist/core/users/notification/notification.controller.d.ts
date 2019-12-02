import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getAllNotification(): Promise<any>;
    createNotification(): Promise<any>;
}
