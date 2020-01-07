import { Repository } from 'typeorm';
import { OneSignalService } from 'onesignal-api-client-nest';
import { Notificacion } from './notificacion.entity';
import { Target } from '../../trivia/target/target.entity';
import { User } from '../user/user.entity';
import { Sesion } from '../sesion/sesion.entity';
import { CreateNotificationDTO } from './notification.dto';
export declare class NotificationService {
    private readonly oneSignalService;
    private notificationRepository;
    private targetRepository;
    private userRepository;
    private sesionRepository;
    constructor(oneSignalService: OneSignalService, notificationRepository: Repository<Notificacion>, targetRepository: Repository<Target>, userRepository: Repository<User>, sesionRepository: Repository<Sesion>);
    viewNotifications(): Promise<import("onesignal-api-client-core").IViewNotificationsResult>;
    createNotification(message: string): Promise<{
        status: number;
    }>;
    getNotificationList(): Promise<{
        notificacions: any[];
    }>;
    send(sendRequest: CreateNotificationDTO): Promise<{
        status: number;
    }>;
}
