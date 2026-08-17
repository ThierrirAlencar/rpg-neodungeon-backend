import { Module } from '@nestjs/common';
import { AuthController } from '../../infra/auth/auth.controller.js';
import { AuthService } from '../../application/services/auth/auth.service.js';
import { RepositoryModule } from '../repository/repository.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { RedisService } from '../../application/services/redis/redis.service.js';



@Module({
    controllers:[AuthController],
    imports:[RepositoryModule,RedisModule],
    providers:[AuthService,RedisService],
})
export class AuthModule {}
