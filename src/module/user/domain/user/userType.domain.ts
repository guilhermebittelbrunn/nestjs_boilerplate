import { HttpException, HttpStatus } from '@nestjs/common';

import ValueObject from '@/shared/core/domain/ValueObject';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { UserTypeEnum } from '@/shared/types/user';

export interface UserTypeProps {
  value: UserTypeEnum;
}

export default class UserType extends ValueObject<UserTypeProps> {
  private constructor(value: UserTypeProps) {
    super(value);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValid(status: string): IGuardResult {
    const validOptions = Object.values(UserTypeEnum);
    return Guard.isOneOf(status, validOptions, status);
  }

  public static create(status: UserTypeEnum): UserType {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: status, argumentName: 'user type' }]);

    if (!guardResult.succeeded) {
      throw new HttpException(guardResult.message, HttpStatus.BAD_REQUEST);
    }

    const isValid = this.isValid(status);

    if (!isValid.succeeded) {
      throw new HttpException(isValid.message, HttpStatus.BAD_REQUEST);
    }

    return new UserType({ value: status });
  }
}
