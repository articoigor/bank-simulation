import { IsInt, IsNotEmpty, isNumber, IsNumber, isNumberString, IsString } from 'class-validator';

export class TransactionDto {
    @IsNotEmpty({ message: 'O campo fromId (source) é obrigatório.' })
    @IsString({ message: 'O campo fromId (source) é do tipo String.' })
    fromId: string;

    @IsNotEmpty({ message: 'O campo password é obrigatório.' })
    @IsString({ message: 'O campo toId (target) é do tipo String.' })
    toId: string;

    @IsNotEmpty({ message: 'O campo amount é obrigatório.' })
    @IsNumber({}, { message: 'O campo amount é do tipo Number.' })
    amount: number;

    constructor(fromId: string, toId: string, amount: number){
        this.fromId = fromId;
        this.toId = toId;
        this.amount = amount;
    }
}
