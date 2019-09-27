import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsTypeService } from './points-type.service';
import { PointsTypeController } from './points-type.controller';
import { PointsType } from './points-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointsType])],
  providers: [PointsTypeService],
  controllers: [PointsTypeController]
})
export class PointsTypeModule {}
