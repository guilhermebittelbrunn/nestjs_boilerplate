import User from '@/module/user/domain/user/user.domain';
import { IBaseRepository } from './base.repository.interface';

export interface IUserRepository extends IBaseRepository<User> {}

export const IUserRepositorySymbol = Symbol('IUserRepository');
