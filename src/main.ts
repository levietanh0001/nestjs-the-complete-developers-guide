import { Module, Controller, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';


@Controller()
class AppController {

  @Get()
  getRootRoute() {
    return 'hello world';
  }

}

@Module({
  // registers controllers
  controllers: [AppController]
})
class AppModule {

}


// start nest app instance, bootstrap is conventional name
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();