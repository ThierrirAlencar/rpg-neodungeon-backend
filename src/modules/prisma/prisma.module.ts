import { Module } from '@nestjs/common';
import { PrismaService } from '../../application/services/prisma/prisma-service.service.js';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
