import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ISellerRepository, ISellerRepositorySymbol } from '@/repositories/seller.repository.interface';

@Injectable()
export class GetSellerService {
  constructor(@Inject(ISellerRepositorySymbol) private readonly sellerRepo: ISellerRepository) {}

  execute(id: string): any {
    const seller = this.sellerRepo.findById(id);

    if (!seller) {
      throw new NotFoundException(`movie with id: ${id} not found`);
    }

    return seller;
  }
}
