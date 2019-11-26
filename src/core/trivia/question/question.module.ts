import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionType } from '../question-type/question-type.entity';
import { Quizz } from '../quizz/quizz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([QuestionType]),
    TypeOrmModule.forFeature([Quizz])
  ],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule { }
