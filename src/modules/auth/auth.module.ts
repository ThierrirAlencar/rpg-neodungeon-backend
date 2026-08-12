import { Module } from '@nestjs/common';
import { AuthController } from '../../infra/auth/auth.controller.js';
import { AuthService } from '../../application/services/auth/auth.service.js';



@Module({
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule {}
