import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { JwtService } from '@/infra/jwt/jwt.service';

@Injectable()
export class RefreshService {
  constructor(
    @Inject(IUserRepositorySymbol) private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.jwtService.generateTokens({
      id: user.id.toValue(),
      email: user.email.value,
      type: user.type.value,
    });

    return {
      user,
      tokens,
    };
  }
}
