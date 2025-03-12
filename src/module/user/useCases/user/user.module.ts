import { Module } from '@nestjs/common';
import { SignUpModule } from './auth/signIn/signUp.module';

@Module({
  imports: [SignUpModule],
})
export class UserModule {}
