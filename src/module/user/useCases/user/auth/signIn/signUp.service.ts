import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { SignUpDTO } from './dto/signUp.dto';
import User from '@/module/user/domain/user/user.domain';
import UserType from '@/module/user/domain/user/userType.domain';
import { UserTypeEnum } from '@/shared/types/user';

@Injectable()
export class SignUpService {
  constructor(@Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository) {}

  async execute(dto: SignUpDTO) {
    const user = User.create({ ...dto, type: UserType.create(UserTypeEnum.USER) });

    return this.userRepo.create(user);
  }
}
