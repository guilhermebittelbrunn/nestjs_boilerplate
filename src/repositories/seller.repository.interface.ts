import { SellerModel } from '@prisma/client';

import { IBaseRepository } from './base.repository.interface';

export interface ISellerRepository extends IBaseRepository<SellerModel> {}

export const ISellerRepositorySymbol = Symbol('ISellerRepository');
