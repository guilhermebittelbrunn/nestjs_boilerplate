import UniqueEntityID from '../core/domain/UniqueEntityID';

interface ServerResponseMetaPagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

type ServerResponse<TData, TMeta extends Record<string, any> | undefined = undefined> = {
  data: TData;
  meta?: TMeta;
};

interface ServerResponseError {
  error: string;
  message: string;
  statusCode: number;
}

export type UpdateFields<T> = {
  [P in keyof T]?: T[P];
} & {
  id: RawID;
};

export type UpdateDTO<T> = {
  [P in keyof T]?: T[P] extends Record<any, any> ? Partial<T[P]> : T[P];
} & {
  id: string;
};

export type AllOptional<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export type RawID = string;

export type GenericId = RawID | UniqueEntityID;

export type { ServerResponse, ServerResponseMetaPagination, ServerResponseError };
