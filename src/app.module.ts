import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './infra/auth/auth.controller';
import { AuthService } from './application/auth/auth.service';
import { PrismaService } from './application/prisma/prisma-service.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
