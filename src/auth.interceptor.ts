import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { RedisRepository } from "./cache/cache.repository";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private redisRepository: RedisRepository){};

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    try{
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];
    
        if (authHeader) {
          const token = authHeader.split(' ')[1];
    
          const decodedToken  = jwt.verify(token, process.env.JWT_SECRET) as any;
    
          if(!decodedToken) throw new UnauthorizedException("Não foi possível decodificar o token informado, verifica o valor inserido.");
    
          const cachedToken = await this.redisRepository.getData(decodedToken.username);

          if(!cachedToken) throw new UnauthorizedException("O token informado não foi encontrado. Faça o sign in !");

          const validUntilDate = new Date(decodedToken.validUntil);

          if (isNaN(validUntilDate.getTime()) || validUntilDate <= new Date()) {
            throw new UnauthorizedException(
              'O token informado expirou. Faça o sign in novamente !',
            );
          }
        }
    
        return next.handle(); 
    } catch(e) {
        throw new UnauthorizedException(e.message);
    }
  }
}