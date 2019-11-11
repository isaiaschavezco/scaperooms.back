import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionController } from './sesion.controller';
import { SesionService } from './sesion.service';
import { Sesion } from './sesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion])],
  controllers: [SesionController],
  providers: [SesionService]
})
export class SesionModule { }
