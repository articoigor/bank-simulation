import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { NewUserDto } from './dtos/newUser.dto';
import { UserRepository } from './user.repository';
import { RegisterNewUserResponse } from './dtos/registerNewUser.response';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { RedisRepository } from 'src/cache/cache.repository';
import { SignInResponse } from './dtos/signIn.response';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheRepository: RedisRepository,
  ) {}
  async registarNewUser(newUserDto: NewUserDto): Promise<RegisterNewUserResponse> {
    try{
      const existingUser = await this.userRepository.getUser(newUserDto.username);

      if(existingUser) throw new BadRequestException('Já existe um usuário com o nome informado.');

      newUserDto.password = await this.encryptPassword(newUserDto.password);

      const newUser = await this.userRepository.insertUser(newUserDto);

      return new RegisterNewUserResponse(newUser.id);
    } catch(e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async signIn(userDto: UserDto): Promise<SignInResponse> {
    const user = await this.userRepository.getUser(userDto.username);

    const isValidLogin = await this.verifyLogin(user, userDto);
    
    if (!isValidLogin) {
      throw new UnauthorizedException("A senha e/ou usuários inseridos são inválidos");
    }

    const response = { 
      token: uuidv4(),
      expiresIn: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString()
    };

    await this.cacheRepository.saveData(response, userDto.username);

    return response;
  }

  private encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return bcrypt.hash(password, saltOrRounds);
  }

  private async verifyLogin(entity: UserEntity, req: UserDto){
    const isValidPassword = await bcrypt.compare(req.password, entity.password);

    const isValidUser = req.username === entity.username;

    return isValidPassword && isValidUser;
  }
}
