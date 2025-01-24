import { Injectable } from '@nestjs/common';
import { SellerModel } from '@prisma/client';

import { BaseRepository } from './base.repository';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';

@Injectable()
export class SellerRepository extends BaseRepository<'sellerModel', SellerModel> {
  constructor(prisma: PrismaService, als: Als) {
    super('sellerModel', prisma, als);
  }
}
