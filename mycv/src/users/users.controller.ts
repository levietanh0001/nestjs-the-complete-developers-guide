import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';


interface ClassConstructor {
  new (...args: any[]): {} // any class
}


// custom decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}


@Controller('/auth')
@Serialize(UserDTO)
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO) {
    return await this.usersService.create(body.email, body.password);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDTO))
  @Get('/:id')
  async findUser(@Param('id') id: string) {

    console.log('handler running');
    const user = await this.usersService.findOne(parseInt(id));
    return user;
  }

  @Get('/')
  async findUsersByEmail(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this.usersService.update(parseInt(id), body);
  }

}
