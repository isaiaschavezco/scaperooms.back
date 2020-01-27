import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { Quizz } from './quizz.entity';
import { User } from '../../users/user/user.entity';
import { Campaing } from '../campaing/campaing.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { Question } from '../question/question.entity';
import { Answerbyuserquizz } from '../answerbyuserquizz/answerbyuserquizz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizz]),
    TypeOrmModule.forFeature([Campaing]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Pointsbyuser]),
    TypeOrmModule.forFeature([Answerbyuserquizz]),
    TypeOrmModule.forFeature([Question])
  ],
  providers: [QuizzService],
  controllers: [QuizzController]
})
export class QuizzModule { }
