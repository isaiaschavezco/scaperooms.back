import { Module } from '@nestjs/common';
import { PointsbyuserService } from './pointsbyuser.service';
import { PointsbyuserController } from './pointsbyuser.controller';

@Module({
  providers: [PointsbyuserService],
  controllers: [PointsbyuserController]
})
export class PointsbyuserModule {}
