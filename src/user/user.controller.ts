import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { RegisterNewUserResponse } from './dtos/registerNewUser.response';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users/signup')
  registarNewUser(@Body() userDto: UserDto): Promise<RegisterNewUserResponse> {   
    return this.userService.registarNewUser(userDto);
  }
}
