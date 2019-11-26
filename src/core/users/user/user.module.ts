import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { Chain } from '../chain/chain.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Token]),
    TypeOrmModule.forFeature([Type]),
    TypeOrmModule.forFeature([Chain])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
