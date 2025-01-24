import { Module } from '@nestjs/common';

import { ValidateMarketplaceAccess } from './validateMarketplaceAccess.service';

import { IMarketplaceRepositorySymbol } from '@/repositories/marketplace.repository.interface';
import { MarketplaceRepository } from '@/repositories/prisma/marketplace.repository';
import { AlsModule } from '@/shared/config/als/als.module';

@Module({
  imports: [AlsModule],
  providers: [
    {
      provide: IMarketplaceRepositorySymbol,
      useClass: MarketplaceRepository,
    },
    ValidateMarketplaceAccess,
  ],
  exports: [ValidateMarketplaceAccess],
})
export class ValidateMarketplaceAccessModule {}
