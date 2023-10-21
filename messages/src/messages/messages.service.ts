import { MessagesRepository } from "./messages.repository";

export class MessageService {

  messagesRepo: MessagesRepository;
  constructor() {

    // MessagesRepository is a dependency of MessageService
    // don't do this in real app, use DI
    this.messagesRepo = new MessagesRepository();
  }

  async findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
  
}