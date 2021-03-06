import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { Target } from '../../trivia/target/target.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([Target])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule { }
