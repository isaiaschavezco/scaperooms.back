import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColonyService } from './colony.service';
import { ColonyController } from './colony.controller';
import { Colony } from './colony.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colony])],
  providers: [ColonyService],
  controllers: [ColonyController]
})
export class ColonyModule {}
