import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { MarketplaceModel } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ValidateMarketplaceAccess } from '../../infra/auth/validateMarketplaceAccess/validateMarketplaceAccess.service';

export const JWT_DEFAULT_STRATEGY = 'jwt';

/*
  @todo, change this interface to shared types
*/
export interface ITokenPayload {
  marketplaceId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_DEFAULT_STRATEGY) {
  constructor(
    config: ConfigService,
    private readonly validateMarketplaceAccess: ValidateMarketplaceAccess,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('jwt.secret'),
    });
  }

  validate({ marketplaceId }: ITokenPayload): Promise<MarketplaceModel | null> {
    return this.validateMarketplaceAccess.validate(marketplaceId);
  }
}
