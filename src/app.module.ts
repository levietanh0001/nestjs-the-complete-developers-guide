import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  // registers controllers
  controllers: [AppController]
})
export class AppModule {

}