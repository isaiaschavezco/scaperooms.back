import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigutarionService } from './configuration.service';
import { ConfigutarionController } from './configuration.controller';
import { Configuration } from './configuration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Configuration])
  ],
  providers: [ConfigutarionService],
  controllers: [ConfigutarionController]
})
export class ConfigutarionModule { }
