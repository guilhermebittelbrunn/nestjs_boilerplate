import { Module } from '@nestjs/common';
import { SignInService } from './signIn.service';
import { SignInController } from './signIn.controller';
import { IUserRepositorySymbol } from '@/repositories/user.repository.interface';
import { UserRepository } from '@/repositories/prisma/user.repository';
import { JwtModule } from '@/infra/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [SignInController],
  providers: [
    SignInService,
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepository,
    },
  ],
})
export class SignInModule {}
