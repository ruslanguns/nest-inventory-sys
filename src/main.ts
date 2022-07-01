import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import openAPIConfig from './config/open-api.config';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Inventory SYS');
  const { createDocument } = SwaggerModule;

  SwaggerModule.setup('docs', app, createDocument(app, openAPIConfig));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  logger.verbose(`Starting the application: ${await app.getUrl()}`);
}
bootstrap();
