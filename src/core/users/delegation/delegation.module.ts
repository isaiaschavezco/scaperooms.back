import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelegationService } from './delegation.service';
import { DelegationController } from './delegation.controller';
import { Delegation } from './delegation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delegation])],
  providers: [DelegationService],
  controllers: [DelegationController]
})
export class DelegationModule {}
