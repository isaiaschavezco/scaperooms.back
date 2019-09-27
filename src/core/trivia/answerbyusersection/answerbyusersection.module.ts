import { Module } from '@nestjs/common';
import { AnswerbyusersectionService } from './answerbyusersection.service';
import { AnswerbyusersectionController } from './answerbyusersection.controller';

@Module({
  providers: [AnswerbyusersectionService],
  controllers: [AnswerbyusersectionController]
})
export class AnswerbyusersectionModule {}
