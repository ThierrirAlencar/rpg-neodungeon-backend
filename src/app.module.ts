import { Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import { KeyvCacheableMemory } from 'cacheable';
import KeyvRedis from '@keyv/redis';
import { AuthModule } from './modules/auth/auth.module.js';
import { PrismaService } from './application/services/prisma/prisma-service.service.js';
import { RedisModule } from './modules/redis/redis.module.js';

@Module({
  imports: [
    AuthModule, 
    RedisModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        stores: [
          new Keyv({
            store: new KeyvCacheableMemory({ ttl: 60000, lruSize: 5000 }), //On memory cache
          }) as any,
          new KeyvRedis('redis://localhost:6379') as any,
        ],
      }),
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
