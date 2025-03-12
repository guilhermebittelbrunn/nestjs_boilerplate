import { Prisma, PrismaClient } from '@prisma/client';

import { IBaseRepository, PaginationQuery } from '../base.repository.interface';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Als } from '@/shared/config/als/als.interface';
import Entity from '@/shared/core/domain/Entity';
import MapperInterface from '@/shared/core/domain/MapperInterface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { GenericId, RawID, ServerResponseMetaPagination, UpdateFields } from '@/shared/types/common';

type PrismaModel = Exclude<keyof PrismaClient, symbol | `$${string}`>;

function applyDeletedWhere<T>() {
  return {
    get: (target: T, prop: PrismaModel) => {
      if (
        typeof target[prop] === 'function' &&
        ['findMany', 'findFirst', 'findUnique', 'count'].includes(prop)
      ) {
        return async (args) => {
          args = { ...args };
          args.where = { ...(args?.where ?? {}), deleted: false };

          return target[prop](args);
        };
      }
      return target[prop];
    },
  };
}

export class BaseRepository<ModelKey extends PrismaModel, Domain extends Entity<any>, Model>
  implements IBaseRepository<Domain>
{
  protected mapper: MapperInterface<Domain, Model>;
  protected usesSoftDelete?: boolean;

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
  manager(): PrismaService[ModelKey] {
    const tx = this.als.getStore()?.tx;

    const model = tx ? tx[this.modelClient] : this.prisma[this.modelClient];

    if (!model) {
      throw new Error(`ModelKey ${this.modelClient} not found`);
    }

    // this proxy is used to intercept the calls to the prisma methods and add the deleted: false to the where clause
    return new Proxy(model, applyDeletedWhere()) as PrismaService[ModelKey];
  }

  async findById(id: GenericId): Promise<Domain | null> {
    const entity = await (this.manager().findUnique as any)({ where: { id } });
    return this.mapper.toDomainOrNull(entity);
  }

  async findByIds(ids: GenericId[]): Promise<Domain[]> {
    const entities = await (this.manager().findMany as any)({ where: { id: { in: ids } } });
    return entities.map(this.mapper.toDomain);
  }

  async findAll(): Promise<Domain[]> {
    const entities = await (this.manager().findMany as any)();
    return entities.map(this.mapper.toDomain);
  }

  async create(data: Domain): Promise<Domain> {
    const rawRecord = await this.mapper.toPersistence(data);

    const recordSaved = await (this.manager().create as any)({ data: rawRecord });

    return this.mapper.toDomain(recordSaved);
  }

  async createBulk(data: Domain[]): Promise<Domain[]> {
    const rawRecords = data.map(this.mapper.toPersistence);

    const recordsSaved = await (this.manager().createManyAndReturn as any)({ data: rawRecords });

    return recordsSaved?.map(this.mapper.toDomain);
  }

  async delete(id: GenericId): Promise<boolean> {
    try {
      if (this.usesSoftDelete) {
        return await this.softDelete(id);
      }
      const deleted = await (this.manager().delete as any)({ where: { id: UniqueEntityID.raw(id) } });
      return !!deleted;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // prisma errors code for not found
        if (error.code === 'P2025' || error.code === 'P2016') {
          return false;
        }
      }
      throw error;
    }
  }

  async deleteBulk(ids: GenericId[]): Promise<boolean> {
    try {
      if (this.usesSoftDelete) {
        return await this.softDeleteBulk(ids);
      }
      const deleted = await (this.manager().deleteMany as any)({
        where: { id: { in: ids.map(UniqueEntityID.raw) } },
      });
      return deleted.count === ids.length;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // prisma errors code for not found
        if (error.code === 'P2025' || error.code === 'P2016') {
          return false;
        }
      }
      throw error;
    }
  }

  async update(data: UpdateFields<Domain>): Promise<RawID> {
    const persistence = await this.mapper.toPersistence(data);
    const { id } = await (this.manager().update as any)({
      where: { id: data.id.toValue() },
      data: persistence,
    });
    return id;
  }

  private async softDelete(id: GenericId): Promise<boolean> {
    const data = await (this.manager().update as any)({
      data: { deleted: true },
      where: { id: UniqueEntityID.raw(id) },
    });

    return !!data;
  }

  private async softDeleteBulk(ids: GenericId[]): Promise<boolean> {
    const data = await (this.manager().updateMany as any)({
      data: { deleted: true },
      where: { ids: ids.map((id) => UniqueEntityID.raw(id)) },
    });

    return data?.count === ids.length;
  }

  getPaginationParams(query: PaginationQuery) {
    const page = query.page && Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  buildPaginationMeta(total: number, page: number, limit: number): ServerResponseMetaPagination {
    return {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
    };
  }
}
