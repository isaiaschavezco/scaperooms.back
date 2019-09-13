import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionTypeService } from './question-type.service';
import { QuestionTypeController } from './question-type.controller';
import { QuestionType } from './question-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionType])],
  providers: [QuestionTypeService],
  controllers: [QuestionTypeController]
})
export class QuestionTypeModule {}
