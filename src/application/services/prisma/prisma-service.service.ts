
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../../prisma/generated/prisma/client.js';
import { DATABASE_URL, NODE_ENV } from '../../../lib/env/index.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      accelerateUrl: DATABASE_URL,
      log:NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
      errorFormat:'pretty',
    });
  }
}
