import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';


// does not need @Injectable because controller only consumes dependencies
@Controller('messages')
export class MessagesController {
  constructor(
    public messagesService: MessagesService,
    // public messagesService2: MessagesService,
    // public messagesService3: MessagesService,
  ) {

    // console.log(messagesService === messagesService2); // true
    // console.log(messagesService === messagesService3); // true
    // don't do this in real app, use DI
    // this.messagesService = new MessageService();
  }

  @Get() // request handler
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
