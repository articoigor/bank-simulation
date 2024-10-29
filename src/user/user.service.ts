import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';
import { RegisterNewUserResponse } from './dtos/registerNewUser.response';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async registarNewUser(userDto: UserDto): Promise<RegisterNewUserResponse> {
    try{
      const existingUser = await this.userRepository.getUser(userDto);

      if(existingUser) throw new BadRequestException('Já existe um usuário com o nome informado.');

      userDto.password = await this.encryptPassword(userDto.password);

      const newUser = await this.userRepository.insertUser(userDto);

      return new RegisterNewUserResponse(newUser.id);
    } catch(e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  private encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return bcrypt.hash(password, saltOrRounds);
  }
}
