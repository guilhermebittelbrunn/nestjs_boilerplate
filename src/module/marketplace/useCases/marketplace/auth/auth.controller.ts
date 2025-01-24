import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';

@Controller('marketplace')
@ApiTags('marketplace')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  async auth(@ValidatedBody() authDTO: AuthDTO) {
    return this.authService.execute(authDTO);
  }
}
