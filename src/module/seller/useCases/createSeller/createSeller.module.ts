import { Module } from '@nestjs/common';

import { CreateSellerController } from './createSeller.controller';
import { CreateSellerService } from './createSeller.service';

import { SellerRepository } from '@/repositories/prisma/seller.repository';
import { ISellerRepositorySymbol } from '@/repositories/seller.repository.interface';

@Module({
  controllers: [CreateSellerController],
  providers: [
    CreateSellerService,
    {
      provide: ISellerRepositorySymbol,
      useClass: SellerRepository,
    },
  ],
})
export class CreateSellerModule {}
