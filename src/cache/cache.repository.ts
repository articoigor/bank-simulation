
import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisRepository {
    constructor(@Inject('REDIS_PROVIDER') private readonly redis: Redis) {}
    async saveData<T>(data: T, key: string): Promise<string> {
        return this.redis.set(key, JSON.stringify(data), "EX", 60 * 60)
    }

    async getData<T>(key: string): Promise<T> {
        return JSON.parse(await this.redis.get(key)) as T;
    }
}