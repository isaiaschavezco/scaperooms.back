"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mailer_1 = require("@nest-modules/mailer");
const chain_module_1 = require("./core/users/chain/chain.module");
const city_module_1 = require("./core/users/city/city.module");
const delegation_module_1 = require("./core/users/delegation/delegation.module");
const colony_module_1 = require("./core/users/colony/colony.module");
const type_module_1 = require("./core/users/type/type.module");
const position_module_1 = require("./core/users/position/position.module");
const token_module_1 = require("./core/users/token/token.module");
const user_module_1 = require("./core/users/user/user.module");
const role_module_1 = require("./core/users/role/role.module");
const menu_module_1 = require("./core/content/menu/menu.module");
const submenu_module_1 = require("./core/content/submenu/submenu.module");
const product_module_1 = require("./core/content/product/product.module");
const tag_module_1 = require("./core/content/tag/tag.module");
const article_module_1 = require("./core/content/article/article.module");
const trade_module_1 = require("./core/content/trade/trade.module");
const question_type_module_1 = require("./core/trivia/question-type/question-type.module");
const question_module_1 = require("./core/trivia/question/question.module");
const target_module_1 = require("./core/trivia/target/target.module");
const campaing_module_1 = require("./core/trivia/campaing/campaing.module");
const quizz_module_1 = require("./core/trivia/quizz/quizz.module");
const upload_module_1 = require("./upload/upload.module");
const notification_module_1 = require("./core/users/notification/notification.module");
const sesion_module_1 = require("./core/users/sesion/sesion.module");
const config_module_1 = require("./config/config.module");
const configuration_module_1 = require("./core/users/configuration/configuration.module");
const answerbyuserquizz_module_1 = require("./core/trivia/answerbyuserquizz/answerbyuserquizz.module");
const message_module_1 = require("./core/content/message/message.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        pool: true,
                        host: "box1128.bluehost.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'hector.iturbe@inmersys.com',
                            pass: 'Hector.Iturbe1'
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
                        adapter: new mailer_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            chain_module_1.ChainModule,
            city_module_1.CityModule,
            delegation_module_1.DelegationModule,
            colony_module_1.ColonyModule,
            type_module_1.TypeModule,
            position_module_1.PositionModule,
            token_module_1.TokenModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            menu_module_1.MenuModule,
            submenu_module_1.SubmenuModule,
            product_module_1.ProductModule,
            tag_module_1.TagModule,
            article_module_1.ArticleModule,
            trade_module_1.TradeModule,
            question_type_module_1.QuestionTypeModule,
            question_module_1.QuestionModule,
            target_module_1.TargetModule,
            campaing_module_1.CampaingModule,
            upload_module_1.UploadModule,
            notification_module_1.NotificationModule,
            sesion_module_1.SesionModule,
            quizz_module_1.QuizzModule,
            config_module_1.ConfigModule,
            configuration_module_1.ConfigutarionModule,
            answerbyuserquizz_module_1.AnswerbyuserquizzModule,
            message_module_1.MessageModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map