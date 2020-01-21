import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { Quizz } from './quizz.entity';
import { User } from '../../users/user/user.entity';
import { Campaing } from '../campaing/campaing.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizz]),
    TypeOrmModule.forFeature([Campaing]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Pointsbyuser])
  ],
  providers: [QuizzService],
  controllers: [QuizzController]
})
export class QuizzModule { }
