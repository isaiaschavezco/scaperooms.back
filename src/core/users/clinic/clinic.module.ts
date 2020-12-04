import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { Clinic } from './clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
  exports: []
})
export class ClinicModule {}

