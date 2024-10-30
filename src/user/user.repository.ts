
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { NewUserDto } from './dtos/newUser.dto';
import { RetrieveUsersResponse } from './dtos/retrieveUsers.response';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly client: Repository<UserEntity>,
  ) {}
  async getAllUsers(): Promise<RetrieveUsersResponse> {
    const query = `SELECT u.id,
                          u.username,
                          u.birthdate,
                          u.balance

                   FROM Users u`;

    return this.client.query(query);
  }
    
  async getUserByName(username: string): Promise<UserEntity> {
    const query = `SELECT *
                   FROM Users u 
                   WHERE u.username = '${username}'`;

    const ans = await this.client.query(query);

    return ans[0];
  }

  async getUserById(id: string): Promise<UserEntity> {
    const query = `SELECT *
                   FROM Users u 
                   WHERE u.id = '${id}'`;

    const ans = await this.client.query(query);

    return ans[0];
  }

  async insertUser(newUserDto: NewUserDto): Promise<UserEntity> {
    const query = `INSERT INTO Users (username, password, birthdate, balance, created_at)
                        VALUES ('${newUserDto.username}', '${newUserDto.password}', '${newUserDto.birthdate}', 100, '${Date.now()}')`;

    const ans = await this.client.query(query);

    return ans[0];
  }

  async updateUser(updatedUser: UserEntity): Promise<any> {
    const query = `UPDATE Users
                    SET balance = ${updatedUser.balance}
                    WHERE id = ${updatedUser.id}`;

    return this.client.query(query);
  }
}
