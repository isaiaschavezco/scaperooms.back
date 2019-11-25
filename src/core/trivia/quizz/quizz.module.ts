import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { Quizz } from './quizz.entity';
import { Campaing } from '../campaing/campaing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizz]),
    TypeOrmModule.forFeature([Campaing])
  ],
  providers: [QuizzService],
  controllers: [QuizzController]
})
export class QuizzModule { }
