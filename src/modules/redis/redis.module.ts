import { Global, Module } from '@nestjs/common';
import { RedisService } from '../../application/services/redis/redis.service.js';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}