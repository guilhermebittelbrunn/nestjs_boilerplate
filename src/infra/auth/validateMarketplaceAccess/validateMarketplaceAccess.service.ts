import { Inject, Injectable } from '@nestjs/common';

import Marketplace from '@/module/marketplace/domain/marketplace.domain';
import { IMarketplaceRepositorySymbol } from '@/repositories/marketplace.repository.interface';
import { MarketplaceRepository } from '@/repositories/prisma/marketplace.repository';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class ValidateMarketplaceAccess {
  constructor(
    private readonly als: Als,
    @Inject(IMarketplaceRepositorySymbol) private readonly marketplaceRepository: MarketplaceRepository,
  ) {}

  async validate(marketplaceId: string) {
    console.log('marketplaceId :>> ', marketplaceId);

    if (!marketplaceId) {
      return null;
    }

    console.log('marketplaceId :>> ', marketplaceId);

    const marketplace = await this.marketplaceRepository.findWithIntegrators(marketplaceId);

    console.log('marketplace :>> ', marketplace);

    if (!marketplace) {
      return null;
    }

    /*
      @note Consider remove this to use in a middleware, for now it's fine 
      because all routes validate the marketplace (only the authentication route doesn't)
    */
    this.als.getStore().marketplace = Marketplace.create(marketplace);

    return marketplace;
  }
}
