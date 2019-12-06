import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answerbyuserquizz } from './answerbyuserquizz.entity';
import { Quizz } from '../quizz/quizz.entity';
import { PointsType } from '../points-type/points-type.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { User } from '../../users/user/user.entity';
import { AnswerbyuserquizzService } from './answerbyuserquizz.service';
import { AnswerbyuserquizzController } from './answerbyuserquizz.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answerbyuserquizz]),
    TypeOrmModule.forFeature([Quizz]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Pointsbyuser]),
    TypeOrmModule.forFeature([PointsType])
  ],
  providers: [AnswerbyuserquizzService],
  controllers: [AnswerbyuserquizzController]
})
export class AnswerbyuserquizzModule { }
