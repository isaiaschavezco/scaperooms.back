import { OneSignalService } from 'onesignal-api-client-nest';
export declare class NotificationService {
    private readonly oneSignalService;
    constructor(oneSignalService: OneSignalService);
    viewNotifications(): Promise<import("onesignal-api-client-core").IViewNotificationsResult>;
    createNotification(message: string): Promise<{
        status: number;
    }>;
}
