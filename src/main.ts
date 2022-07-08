import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import openAPIConfig from './config/open-api.config';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Inventory SYS');
  const { createDocument } = SwaggerModule;

  const document = createDocument(app, openAPIConfig);
  writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('docs', app, document);

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
