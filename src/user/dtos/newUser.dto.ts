import { IsNotEmpty, IsString } from 'class-validator';
import { IsBirthDate } from '../constraints/birthdateConstraint';
import { IsUserExistent } from '../constraints/usernameConstraint';

export class NewUserDto {
    @IsNotEmpty({ message: 'O campo username é obrigatório.' })
    @IsString({ message: 'O campo username é do tipo String.' })
    @IsUserExistent({ message: 'Já existe um usuário com o nome informado.' })
    username: string;

    @IsNotEmpty({ message: 'O campo password é obrigatório.' })
    @IsString({ message: 'O campo password é do tipo String.' })
    password: string;

    @IsNotEmpty({ message: 'O campo birthdate é obrigatório.' })
    @IsBirthDate({ message: "O campo birthdate informado é inválido. (FORMATO: DD/MM/AAAA)"})
    birthdate: string;

    constructor(username: string, password: string, birthdate: string){
        this.username = username;
        this.password = password;
        this.birthdate = birthdate;
    }
}
