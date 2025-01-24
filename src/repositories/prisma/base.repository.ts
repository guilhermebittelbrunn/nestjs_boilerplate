import { PrismaClient } from '@prisma/client';

import { SingleEntityResponse } from '../base.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';
import { GenericId, RawID, UpdateFields } from '@/shared/types/common';

type PrismaModel = Exclude<keyof PrismaClient, symbol | `$${string}`>;

export class BaseRepository<Model extends PrismaModel, EntityType> {
  constructor(
    private readonly modelClient: PrismaModel,
    private readonly prisma: PrismaService,
    private readonly als: Als,
  ) {}

  /**
   * This manager is used for two reasons:
   * - To be able to use with transactions
   * - To be able to consume prisma interface in a more practical way (especially for create/update/delete)
   */
  manager(): PrismaService[Model] {
    const tx = this.als.getStore()?.tx;

    const model = tx ? tx[this.modelClient] : this.prisma[this.modelClient];

    if (!model) {
      throw new Error(`Model ${this.modelClient} not found`);
    }

    return model as PrismaService[Model];
  }

  findById(id: GenericId): SingleEntityResponse<EntityType> {
    return (this.manager().findUnique as any)({ where: { id } });
  }

  create(data: Partial<EntityType>): SingleEntityResponse<EntityType> {
    return (this.manager().create as any)({ data });
  }

  delete(id: GenericId): Promise<boolean> {
    return (this.manager().delete as any)({ where: { id } });
  }

  update(data: UpdateFields<EntityType>): Promise<RawID> {
    return (this.manager().update as any)({ where: { id: data.id }, data });
  }

  updateMany(data: UpdateFields<EntityType>[]): Promise<RawID[]> {
    return (this.manager().updateMany as any)({ data });
  }
}
