export class SignInResponse {
    token: string;
    expiresIn: string;

    constructor(token: string, expirenIn: string){
        this.token = token;
        this.expiresIn = expirenIn;
    }
}