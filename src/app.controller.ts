import { Controller, Get } from "@nestjs/common";


@Controller('/basics') // affects all route handlers in AppController
export class AppController {

  @Get('/hello-world')
  getRootRoute() {
    return 'hello world';
  }

}