import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { OneSignalModule } from 'onesignal-api-client-nest';

@Module({
  imports: [
    OneSignalModule.forRootAsync({
      useFactory: async () => {
        return {
          appId: '188260b3-3b62-4622-aa05-cbe0aed8499a',
          restApiKey: 'ZjhjNGQ3OWEtYTRmMi00MjdmLWI2Y2UtMThjMTNkNzg0MjBj'
        };
      }
      // inject: [ConfigService],
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule { }
