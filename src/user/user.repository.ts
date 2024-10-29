
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { NewUserDto } from './dtos/newUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly client: Repository<UserEntity>,
  ) {}
    
  async getUser(username: string): Promise<UserEntity> {
    const query = `SELECT *
                   FROM Users u 
                   WHERE u.username = '${username}'`;

    const ans = await this.client.query(query);

    return ans[0];
  }

  async insertUser(newUserDto: NewUserDto): Promise<UserEntity> {
    const query = `INSERT INTO Users (username, password, birthdate, created_at)
                        VALUES ('${newUserDto.username}', '${newUserDto.password}', '${newUserDto.birthdate}', '${Date.now()}')`;

    const ans = await this.client.query(query);

    return ans[0];
  }
}
