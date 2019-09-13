import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { Target } from './target.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Target])],
  providers: [TargetService],
  controllers: [TargetController]
})
export class TargetModule {}
