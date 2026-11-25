import { Module } from '@nestjs/common';
import { AuthController } from '../../infra/auth/auth.controller.js';
import { AuthService } from '../../application/services/auth/auth.service.js';
import { RepositoryModule } from '../repository/repository.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { RedisService } from '../../application/services/redis/redis.service.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../lib/env/index.js';
import ms from 'ms';
import { JwtStrategy } from '../../application/services/auth/auth.strategy.js';



@Module({
    controllers:[AuthController],
    imports:[
        RepositoryModule,
        RedisModule, 
        JwtModule.register({
                secret: JWT_SECRET,
                signOptions: { expiresIn: JWT_EXPIRES_IN as ms.StringValue },
            }),
        ],
    providers:[AuthService,RedisService,JwtStrategy],
})
export class AuthModule {}
