import { Module } from '@nestjs/common';
import { Clinic } from './../../users/clinic/clinic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { Target } from './target.entity';
import { City } from '../../users/city/city.entity';
import { Delegation } from '../../users/delegation/delegation.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Type } from '../../users/type/type.entity';
import { Position } from '../../users/position/position.entity';
import { Role } from '../../users/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Target]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Chain]),
    TypeOrmModule.forFeature([Clinic]),

    TypeOrmModule.forFeature([Type]),
    TypeOrmModule.forFeature([Position]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Delegation])
  ],
  providers: [TargetService],
  controllers: [TargetController]
})
export class TargetModule { }
