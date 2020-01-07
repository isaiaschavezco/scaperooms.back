import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { User } from '../../users/user/user.entity';
import { Message } from '../message/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), TypeOrmModule.forFeature([User])],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule { }
