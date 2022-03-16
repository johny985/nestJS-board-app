import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  const configs = new DocumentBuilder()
    .setTitle('nestjs-board')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('board')
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
