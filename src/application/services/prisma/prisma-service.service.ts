
import { Global, Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../../prisma/generated/prisma/client.js';
import { DATABASE_URL, NODE_ENV } from '../../../lib/env/index.js';
import { PrismaPg } from "@prisma/adapter-pg"

@Global()
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg(DATABASE_URL)
    super({
      adapter,
      log:NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
      errorFormat:'pretty',
    });
  }
}
