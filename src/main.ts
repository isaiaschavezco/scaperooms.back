import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { json } from 'body-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.use(helmet());
  app.enableCors();
  await app.listen(config.get('PORT'));
}
bootstrap();
