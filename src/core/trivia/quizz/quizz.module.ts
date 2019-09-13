import { Module } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';

@Module({
  providers: [QuizzService],
  controllers: [QuizzController]
})
export class QuizzModule {}
