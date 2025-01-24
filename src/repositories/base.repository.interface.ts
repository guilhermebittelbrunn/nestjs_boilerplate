import { GenericId, RawID, UpdateFields } from '@/shared/types/common';

export type SingleEntityResponse<T> = Promise<T | null> | T | null;

export type MultiEntityResponse<T> = Promise<T[]> | T[];

export interface GenericDateRangeQuery {
  start: Date;
  end: Date;
}

export interface GenericDateQuery {
  days?: Array<Date>;
  months?: Array<number>;
  range?: GenericDateRangeQuery;
}

export interface IBaseRepository<Domain> {
  findById(id: GenericId): SingleEntityResponse<Domain>;
  create(data: Partial<Domain>): SingleEntityResponse<Domain>;
  update(data: UpdateFields<Domain>): Promise<RawID>;
  delete(id: string): Promise<boolean>;
}
