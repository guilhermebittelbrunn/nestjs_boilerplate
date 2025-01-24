import { Injectable } from '@nestjs/common';
import { MarketplaceModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IMarketplaceRepository } from '../marketplace.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class MarketplaceRepository
  extends BaseRepository<'marketplaceModel', MarketplaceModel>
  implements IMarketplaceRepository
{
  constructor(prisma: PrismaService, als: Als) {
    super('marketplaceModel', prisma, als);
  }

  async findWithIntegrators(id: string): Promise<MarketplaceModel | null> {
    return this.manager().findUnique({ where: { id }, include: { marketplaceIntegrators: true } });
  }
}
