import { UserModel } from '@prisma/client';

import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { PartialAutoGenerated } from '@/shared/types/common';
import Guard from '@/shared/core/logic/guard';
import UserType from './userType.domain';
import { UserTypeEnum } from '@/shared/types/user';

interface IUserProps extends PartialAutoGenerated<Partial<Omit<UserModel, 'type'>>> {
  type: UserType;
}

export default class User extends Entity<IUserProps> {
  constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string | undefined | null {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get type(): UserType {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deleted(): boolean {
    return this.props.deleted;
  }

  public static create(props: IUserProps, id?: UniqueEntityID) {
    const guardedProps = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.password, argumentName: 'password' },
    ]);

    if (!guardedProps.succeeded) {
      throw new Error(guardedProps.message);
    }

    const propsWithDefault = {
      type: UserType.create(UserTypeEnum.USER),
      ...props,
    };

    return new User(propsWithDefault, id);
  }
}
