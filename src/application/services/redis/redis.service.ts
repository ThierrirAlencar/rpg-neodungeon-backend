import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { createClient, RedisClientType } from 'redis';
import { REDIS_URL } from '../../../lib/env/index.js';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: REDIS_URL,
    });

    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  async onModuleInit() {
    await this.client.connect();

    console.log('Connected to Redis');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set(
    key: string,
    value: unknown,
    ttl?: number,
  ): Promise<void> {
    const serialized = JSON.stringify(value);

    if (ttl) {
      await this.client.set(key, serialized, {
        EX: ttl,
      });

      return;
    }

    await this.client.set(key, serialized);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }
}