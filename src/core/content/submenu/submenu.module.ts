import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmenuService } from './submenu.service';
import { SubmenuController } from './submenu.controller';
import { Submenu } from './submenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submenu])],
  providers: [SubmenuService],
  controllers: [SubmenuController]
})
export class SubmenuModule {}
