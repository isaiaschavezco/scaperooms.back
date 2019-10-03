import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChainModule } from './core/users/chain/chain.module';
import { CityModule } from './core/users/city/city.module';
import { DelegationModule } from './core/users/delegation/delegation.module';
import { ColonyModule } from './core/users/colony/colony.module';
import { TypeModule } from './core/users/type/type.module';
import { PositionModule } from './core/users/position/position.module';
import { TokenModule } from './core/users/token/token.module';
import { UserModule } from './core/users/user/user.module';
import { RoleModule } from './core/users/role/role.module';
import { MenuModule } from './core/content/menu/menu.module';
import { SubmenuModule } from './core/content/submenu/submenu.module';
import { ProductModule } from './core/content/product/product.module';
import { TagModule } from './core/content/tag/tag.module';
import { ArticleModule } from './core/content/article/article.module';
import { TradeModule } from './core/content/trade/trade.module';
import { QuestionTypeModule } from './core/trivia/question-type/question-type.module';
import { QuestionModule } from './core/trivia/question/question.module';
import { TargetModule } from './core/trivia/target/target.module';
import { CampaingModule } from './core/trivia/campaing/campaing.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ChainModule,
    CityModule,
    DelegationModule,
    ColonyModule,
    TypeModule,
    PositionModule,
    TokenModule,
    UserModule,
    RoleModule,
    MenuModule,
    SubmenuModule,
    ProductModule,
    TagModule,
    ArticleModule,
    TradeModule,
    QuestionTypeModule,
    QuestionModule,
    TargetModule,
    CampaingModule,
    UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
