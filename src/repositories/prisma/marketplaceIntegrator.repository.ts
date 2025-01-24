import { Injectable } from '@nestjs/common';
import { MarketplaceIntegratorModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { IMarketplaceIntegratorRepository } from '../marketplaceIntegrator.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class MarketplaceIntegratorRepository
  extends BaseRepository<'marketplaceIntegratorModel', MarketplaceIntegratorModel>
  implements IMarketplaceIntegratorRepository
{
  constructor(prisma: PrismaService, als: Als) {
    super('marketplaceIntegratorModel', prisma, als);
  }
}
