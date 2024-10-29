import { Body, Controller, Get, HttpCode, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDto } from './dtos/newUser.dto';
import { RegisterNewUserResponse } from './dtos/registerNewUser.response';
import { SignInResponse } from './dtos/signIn.response';
import { UserDto } from './dtos/user.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { AuthInterceptor } from 'src/auth.interceptor';

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

  @Post('/transfer')
  @HttpCode(204)
  @UseInterceptors(AuthInterceptor)
  processTransaction(@Body() transactionDto: TransactionDto): any {   
    return this.userService.processTransaction(transactionDto);
  }
}
