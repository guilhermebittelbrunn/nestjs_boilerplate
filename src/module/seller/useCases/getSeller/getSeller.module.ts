import { Module } from '@nestjs/common';

import { GetSellerController } from './getSeller.controller';
import { GetSellerService } from './getSeller.service';

import { SellerRepository } from '@/repositories/prisma/seller.repository';
import { ISellerRepositorySymbol } from '@/repositories/seller.repository.interface';

@Module({
  controllers: [GetSellerController],
  providers: [
    GetSellerService,
    {
      provide: ISellerRepositorySymbol,
      useClass: SellerRepository,
    },
  ],
})
export class GetSellerModule {}
