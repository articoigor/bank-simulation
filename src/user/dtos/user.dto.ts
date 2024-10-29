import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @IsNotEmpty({ message: 'O campo username é obrigatório.' })
    @IsString({ message: 'O campo username é do tipo String.' })
    username: string;

    @IsNotEmpty({ message: 'O campo password é obrigatório.' })
    @IsString({ message: 'O campo password é do tipo String.' })
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}
