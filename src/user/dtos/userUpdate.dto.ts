import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserUpdateDto {
    @IsNotEmpty({ message: 'O campo id é obrigatório.' })
    @IsString({ message: 'O campo id é do tipo String.' })
    id: string;

    @IsNotEmpty({ message: 'O campo newBalance é obrigatório.' })
    @IsNumber({}, { message: 'O campo newBalance é do tipo Number.' })
    newBalance: number;

    constructor(id: string, newBalance: number){
        this.id = id;
        this.newBalance = newBalance;
    }
}
