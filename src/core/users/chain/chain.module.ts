import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainService } from './chain.service';
import { ChainController } from './chain.controller';
import { Chain } from './chain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chain])],
  providers: [ChainService],
  controllers: [ChainController],
  exports: []
})
export class ChainModule { }