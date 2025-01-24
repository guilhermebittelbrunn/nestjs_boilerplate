import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidateMarketplaceAccessModule } from './infra/auth/validateMarketplaceAccess/validateMarketplaceAccess.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { TransactionManagerModule } from './infra/database/transactionManager/transactionManager.module';
import { MarketplaceModule } from './module/marketplace/useCases/marketplace/marketplace.module';
import { SellerModule } from './module/seller/seller.module';
import { AlsMiddleware } from './shared/config/als/als.middleware';
import { AlsModule } from './shared/config/als/als.module';
import configuration from './shared/config/configuration';
import { TransformResponseInterceptor } from './shared/interceptors/transform-response/transform-response.interceptor';
import { JwtStrategy } from './shared/strategies/jwt.strategy';

@Module({
  imports: [
    // setup
    PrismaModule,
    TransactionManagerModule,
    ValidateMarketplaceAccessModule,
    AlsModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
        customProps: () => ({
          context: 'HTTP',
        }),
        redact: {
          paths: ['req.headers', 'res.headers'],
          remove: true,
        },
        enabled: process.env.NODE_ENV !== 'test',
      },
    }),
    // modules
    SellerModule,
    MarketplaceModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    AppService,
    JwtStrategy,
  ],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlsMiddleware).forRoutes('*');
  }
}
