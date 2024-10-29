import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDto } from './dtos/newUser.dto';
import { RegisterNewUserResponse } from './dtos/registerNewUser.response';
import { SignInResponse } from './dtos/signIn.response';
import { UserDto } from './dtos/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users/signup')
  registarNewUser(@Body() newUserDto: NewUserDto): Promise<RegisterNewUserResponse> {   
    return this.userService.registarNewUser(newUserDto);
  }

  @Post('/users/signin')
  signIn(@Body() userDto: UserDto): Promise<SignInResponse> {   
    return this.userService.signIn(userDto);
  }
}
