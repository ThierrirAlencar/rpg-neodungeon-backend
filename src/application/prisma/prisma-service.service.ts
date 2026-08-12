
import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { DATABASE_URL } from 'src/lib/env';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaClient({ accelerateUrl: DATABASE_URL });
    super({ adapter });
  }
}
