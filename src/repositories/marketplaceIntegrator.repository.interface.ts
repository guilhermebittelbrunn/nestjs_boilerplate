import { MarketplaceIntegratorModel } from '@prisma/client';

import { IBaseRepository } from './base.repository.interface';

export interface IMarketplaceIntegratorRepository extends IBaseRepository<MarketplaceIntegratorModel> {}

export const IMarketplaceIntegratorRepositorySymbol = Symbol('IMarketplaceIntegratorRepository');
