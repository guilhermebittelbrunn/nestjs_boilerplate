import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ITokenPayload, JWT_DEFAULT_STRATEGY } from '../types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_DEFAULT_STRATEGY) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('jwt.secret'),
    });
  }

  validate({ userId }: ITokenPayload): Promise<{ userId: string }> {
    // service to validade the user
    return Promise.resolve({ userId });
  }
}
