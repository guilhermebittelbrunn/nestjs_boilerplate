import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthDTO } from './dto/auth.dto';

import {
  IMarketplaceRepository,
  IMarketplaceRepositorySymbol,
} from '@/repositories/marketplace.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IMarketplaceRepositorySymbol) private readonly marketplaceRepo: IMarketplaceRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute({ marketplaceId }: AuthDTO) {
    const marketplace = await this.marketplaceRepo.findById(marketplaceId);

    console.log('validate marketplace :>> ', marketplace);

    if (!marketplace) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = await this.generateToken(marketplace.id);

    return token;
  }

  private async generateToken(id: string) {
    const payload = {
      marketplaceId: id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('jwt.secret'),
      }),
    };
  }
}
