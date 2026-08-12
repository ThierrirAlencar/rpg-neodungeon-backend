import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/auth/auth.service';
import { AuthController } from 'src/infra/auth/auth.controller';

@Module({
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule {}
