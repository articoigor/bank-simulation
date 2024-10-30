export class RetrieveUsersResponse {
    users: CompleteUser[];

    constructor(users: CompleteUser[]){
        this.users = users;
    }
}

class CompleteUser {
    id: number;
    username: string;
    birthdate: string;
    balance: number;

    constructor(id: number, username: string, birthdate: string, balance: number){
        this.id = id;
        this.username = username;
        this.birthdate = birthdate;
        this.balance = balance;
    }
}