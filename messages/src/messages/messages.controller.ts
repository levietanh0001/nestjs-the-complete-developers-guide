import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageService } from './messages.service';


@Controller('messages')
export class MessagesController {

  messagesService: MessageService;

  constructor() {
    // don't do this in real app, use DI
    this.messagesService = new MessageService();
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

    if(!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
