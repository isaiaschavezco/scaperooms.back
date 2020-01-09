import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsbyuserService } from './pointsbyuser.service';
import { PointsbyuserController } from './pointsbyuser.controller';
import { Pointsbyuser } from './pointsbyuser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pointsbyuser])
  ],
  providers: [PointsbyuserService],
  controllers: [PointsbyuserController]
})
export class PointsbyuserModule { }
