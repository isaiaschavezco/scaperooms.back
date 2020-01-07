import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { Chain } from '../chain/chain.entity';
import { Position } from '../position/position.entity';
import { City } from '../city/city.entity';
import { Delegation } from '../delegation/delegation.entity';
import { Role } from '../role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Token]),
    TypeOrmModule.forFeature([Type]),
    TypeOrmModule.forFeature([Chain]),
    TypeOrmModule.forFeature([Position]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Delegation]),
    TypeOrmModule.forFeature([Role])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
