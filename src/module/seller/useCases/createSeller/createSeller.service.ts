import { Inject, Injectable } from '@nestjs/common';
import { SellerModel } from '@prisma/client';

import { CreateSellerDTO } from './dto/createSeller.dto';

import SellerEntity from '../../domain/seller.domain';

import { ISellerRepository, ISellerRepositorySymbol } from '@/repositories/seller.repository.interface';

@Injectable()
export class CreateSellerService {
  constructor(@Inject(ISellerRepositorySymbol) private readonly sellerRepo: ISellerRepository) {}

  async execute(createCreateSellerDto: CreateSellerDTO): Promise<SellerModel> {
    try {
      const seller = SellerEntity.create(createCreateSellerDto);

      const data = this.sellerRepo.create(seller.props);

      throw new Error('Error message');

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
