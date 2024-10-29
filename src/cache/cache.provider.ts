import { Provider } from "@nestjs/common";
import Redis from 'ioredis';

export const RedisProvider: Provider = {
  provide: 'REDIS_PROVIDER', 
  useFactory: () => {
    return new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
  },
};
