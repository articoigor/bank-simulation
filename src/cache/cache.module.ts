import { Module } from "@nestjs/common";
import { RedisRepository } from "./cache.repository";
import { RedisProvider } from "./cache.provider";

@Module({
    providers: [RedisProvider, RedisRepository],
    exports: [RedisRepository],
  })
  export class CacheModule {}