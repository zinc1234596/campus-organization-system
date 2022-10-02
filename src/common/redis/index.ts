import Redis from 'ioredis';
import { getConfig } from '@/utils';

const { REDIS_CONFIG } = getConfig();

export class RedisInstance {
  static async initRedis() {
    const redis = new Redis(REDIS_CONFIG);
    redis.on('error', (err) => console.log('Redis cluster Error', err));
    redis.on('connect', () => console.log('redis连接成功'));
    return redis;
  }
}
