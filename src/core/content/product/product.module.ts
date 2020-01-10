import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';
import { PointsType } from '../../trivia/points-type/points-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Pointsbyuser]),
    TypeOrmModule.forFeature([PointsType])
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
