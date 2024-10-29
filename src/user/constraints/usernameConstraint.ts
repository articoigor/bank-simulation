import { Injectable, Inject } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { NewUserDto } from '../dtos/newUser.dto';
import { UserRepository } from '../user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistValidator implements ValidatorConstraintInterface {
  constructor(@Inject(UserRepository) private readonly usersRepository: UserRepository) {}

  async validate(text: string) {
    const user = await this.usersRepository.getUserByName(text);
    
    return !user;
  }
}

export function IsUserExistent(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUserExistent',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistValidator,
    });
  };
}
