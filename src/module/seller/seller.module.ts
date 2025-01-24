import { Module } from '@nestjs/common';

import { CreateSellerModule } from './useCases/createSeller/createSeller.module';
import { GetSellerModule } from './useCases/getSeller/getSeller.module';

@Module({
  imports: [CreateSellerModule, GetSellerModule],
})
export class SellerModule {}
