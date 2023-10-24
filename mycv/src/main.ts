import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // strip out fields that are not defined in DTO
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();