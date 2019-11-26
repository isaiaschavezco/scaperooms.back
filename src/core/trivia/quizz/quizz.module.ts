import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { Quizz } from './quizz.entity';
import { User } from '../../users/user/user.entity';
import { Campaing } from '../campaing/campaing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizz]),
    TypeOrmModule.forFeature([Campaing]),
    TypeOrmModule.forFeature([User])
  ],
  providers: [QuizzService],
  controllers: [QuizzController]
})
export class QuizzModule { }
