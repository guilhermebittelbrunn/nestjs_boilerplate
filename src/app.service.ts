import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from './infra/database/prisma/prisma.service';
import { Als } from './shared/config/als/als.interface';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly als: Als,
  ) {}

  async healthCheck(): Promise<{ message: string }> {
    const store = this.als.getStore();

    console.log('store :>> ', store);

    await this.prismaService.$queryRaw`SELECT 1`;

    const message = `Server running on ${
      process.env.NODE_ENV || 'development'
    } mode. Uptime: ${process.uptime()}`;

    this.logger.log(message);

    return { message };
  }
}
