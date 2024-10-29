import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserExistValidator } from './constraints/usernameConstraint';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),],
  controllers: [UserController],
  providers: [UserRepository, UserService, UserExistValidator],
})
export class UserModule {}
