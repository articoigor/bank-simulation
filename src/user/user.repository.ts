
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly client: Repository<UserEntity>,
  ) {}
    
  async getUser(userDto: UserDto): Promise<UserEntity> {
    const query = `SELECT *
                   FROM Users u 
                   WHERE u.username = '${userDto.username}'`;

    const ans = await this.client.query(query);

    return ans[0];
  }

  async insertUser(userDto: UserDto): Promise<UserEntity> {
    const query = `INSERT INTO Users (username, password, birthdate, created_at)
                        VALUES ('${userDto.username}', '${userDto.password}', '${userDto.birthdate}', '${Date.now()}')`;

    const ans = await this.client.query(query);

    return ans[0];
  }
}
