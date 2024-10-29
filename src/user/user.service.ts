import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { NewUserDto } from './dtos/newUser.dto';
import { UserRepository } from './user.repository';
import { RegisterNewUserResponse } from './dtos/registerNewUser.response';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { RedisRepository } from 'src/cache/cache.repository';
import { SignInResponse } from './dtos/signIn.response';
import { TransactionDto } from './dtos/transaction.dto';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheRepository: RedisRepository,
  ) {}
  async registarNewUser(newUserDto: NewUserDto): Promise<RegisterNewUserResponse> {
    try{
      const existingUser = await this.userRepository.getUserByName(newUserDto.username);

      if(existingUser) throw new BadRequestException('Já existe um usuário com o nome informado.');

      newUserDto.password = await this.encryptPassword(newUserDto.password);

      const newUser = await this.userRepository.insertUser(newUserDto);

      return new RegisterNewUserResponse(newUser.id);
    } catch(e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async signIn(userDto: UserDto): Promise<SignInResponse> {
    const user = await this.userRepository.getUserByName(userDto.username);

    const isValidLogin = await this.verifyLogin(user, userDto);
    
    if (!isValidLogin) {
      throw new UnauthorizedException("A senha e/ou usuários inseridos são inválidos");
    }

    const validityInterval = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();

    const bearerToken = this.generateBearerToken({
      username: userDto.username,
      validUntil: validityInterval
    });

    const response = { 
      token: bearerToken,
      expiresIn: validityInterval
    };

    await this.cacheRepository.saveData(bearerToken, userDto.username);

    return response;
  }

  async processTransaction(transactionDto: TransactionDto): Promise<any>{
    const source = await this.userRepository.getUserById(transactionDto.fromId);

    const target = await this.userRepository.getUserById(transactionDto.toId);

    source.balance -= transactionDto.amount;

    if(source.balance < 0) throw new BadRequestException('Não há saldo suficiente na conta origem para realizar a transação.');

    target.balance += transactionDto.amount;

    await this.userRepository.updateUser(source);
    
    await this.userRepository.updateUser(target);

    return null;
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

  private generateBearerToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}
