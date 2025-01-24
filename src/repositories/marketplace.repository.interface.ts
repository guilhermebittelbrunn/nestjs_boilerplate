import { MarketplaceModel } from '@prisma/client';

import { IBaseRepository, SingleEntityResponse } from './base.repository.interface';

export interface IMarketplaceRepository extends IBaseRepository<MarketplaceModel> {
  findWithIntegrators(id: string): SingleEntityResponse<MarketplaceModel>;
}

export const IMarketplaceRepositorySymbol = Symbol('IMarketplaceRepository');
