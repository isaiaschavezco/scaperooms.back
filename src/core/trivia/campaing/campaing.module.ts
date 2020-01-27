import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaingService } from './campaing.service';
import { CampaingController } from './campaing.controller';
import { Campaing } from './campaing.entity';
import { Target } from '../target/target.entity';
import { User } from '../../users/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaing]),
    TypeOrmModule.forFeature([Target]),
    TypeOrmModule.forFeature([User])
  ],
  providers: [CampaingService],
  controllers: [CampaingController]
})
export class CampaingModule { }
