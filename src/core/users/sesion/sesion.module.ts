import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionController } from './sesion.controller';
import { SesionService } from './sesion.service';
import { Sesion } from './sesion.entity';
import { User } from '../user/user.entity';
import { Notificacion } from '../notification/notificacion.entity';
import { Configuration } from '../configuration/configuration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sesion]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Configuration]),
    TypeOrmModule.forFeature([Notificacion])
  ],
  controllers: [SesionController],
  providers: [SesionService]
})
export class SesionModule { }
