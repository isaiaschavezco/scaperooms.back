import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();
  await app.listen(config.get('PORT'));
}
bootstrap();
