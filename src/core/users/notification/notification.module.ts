import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { OneSignalModule } from 'onesignal-api-client-nest';
import { Target } from '../../trivia/target/target.entity';
import { Notificacion } from './notificacion.entity';
import { User } from '../user/user.entity';
import { Sesion } from '../sesion/sesion.entity';

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
    TypeOrmModule.forFeature([Notificacion]),
    TypeOrmModule.forFeature([Target]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Sesion])
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule { }
