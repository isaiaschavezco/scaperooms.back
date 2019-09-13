import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaingService } from './campaing.service';
import { CampaingController } from './campaing.controller';
import { Campaing } from './campaing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaing])],
  providers: [CampaingService],
  controllers: [CampaingController]
})
export class CampaingModule {}
