import { Module, Controller, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';





// start nest app instance, bootstrap is conventional name
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();