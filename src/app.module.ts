import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
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
import { QuizzModule } from './core/trivia/quizz/quizz.module';
import { UploadModule } from './upload/upload.module';
import { NotificationModule } from './core/users/notification/notification.module';
import { SesionModule } from './core/users/sesion/sesion.module';
import { ConfigModule } from './config/config.module';
import { ConfigutarionModule } from './core/users/configuration/configuration.module';
import { AnswerbyuserquizzModule } from './core/trivia/answerbyuserquizz/answerbyuserquizz.module';
import { MessageModule } from './core/content/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          pool: true,
          host: "box1128.bluehost.com", // "smtp.ethereal.email",
          port: 465, // 587,
          secure: true, // false,
          auth: {
            user: 'hector.iturbe@inmersys.com', // 'nicola.bruen@ethereal.email',
            pass: 'Hector.Iturbe1'// 'a3UQAZ3E4yZMu9JG74'
          },
          tls: {
            rejectUnauthorized: false
          }
        },
        defaults: {
          from: '"Invitación Bioderma" <nicola.bruen@ethereal.email>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
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
    UploadModule,
    NotificationModule,
    SesionModule,
    QuizzModule,
    ConfigModule,
    ConfigutarionModule,
    AnswerbyuserquizzModule,
    MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
