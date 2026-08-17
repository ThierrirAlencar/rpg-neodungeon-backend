import { Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import { KeyvCacheableMemory } from 'cacheable';
import KeyvRedis from '@keyv/redis';
import { AuthModule } from './modules/auth/auth.module.js';
import { RedisModule } from './modules/redis/redis.module.js';
import { ConfigModule } from '@nestjs/config';
import { MinIoModule } from './modules/storage/minio.module.js';
import { RepositoryModule } from './modules/repository/repository.module.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule, //Database Service
    RepositoryModule, //Database Repositories
    AuthModule, //Autentication module
    RedisModule, //Cache Module for Redis
    CacheModule.registerAsync({ //Cache Module for Memory and Redis
      useFactory: async () => ({
        stores: [
          new Keyv({
            store: new KeyvCacheableMemory({ ttl: 60000, lruSize: 5000 }), //On memory cache
          }) as any,
          new KeyvRedis('redis://localhost:6379') as any,
        ],
      }),
    }),
    ConfigModule.forRoot({ //Config Module for Environment Variables
      isGlobal: true
    }),
    MinIoModule //Storage Module for MinIO
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
