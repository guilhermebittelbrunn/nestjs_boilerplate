import { UserModel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import User from '../domain/user/user.domain';
import { UserDTO } from '../dto/user.dto';
import UserType from '../domain/user/userType.domain';
import { UserTypeEnum } from '@/shared/types/user';

export interface UserModelWithRelations extends UserModel {}

class BaseUserMapper extends Mapper<User, UserModelWithRelations, UserDTO> {
  toDomain(user: UserModelWithRelations): User {
    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        type: UserType.create(user.type as UserTypeEnum),

        deleted: user.deleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      new UniqueEntityID(user.id),
    );
  }
  toPersistence(user: User): UserModelWithRelations {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type.value,
      deleted: user.deleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as UserModelWithRelations;
  }
  toDTO(user: User): UserDTO {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      type: user.type.value as UserTypeEnum,
      deleted: user.deleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

const UserMapper = new BaseUserMapper();

export default UserMapper;
