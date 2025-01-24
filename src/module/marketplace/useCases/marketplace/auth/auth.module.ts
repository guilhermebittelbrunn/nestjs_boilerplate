import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { IMarketplaceRepositorySymbol } from '@/repositories/marketplace.repository.interface';
import { MarketplaceRepository } from '@/repositories/prisma/marketplace.repository';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IMarketplaceRepositorySymbol,
      useClass: MarketplaceRepository,
    },
  ],
})
export class AuthModule {}
