import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSellerService } from './createSeller.service';
import { CreateSellerDTO } from './dto/createSeller.dto';
import { CreateSellerResponseDTO } from './dto/createSeller.response.dto';

import { TransactionManagerService } from '@/infra/database/transactionManager/transactionManager.service';
import { ValidatedBody } from '@/shared/decorators/validatedBody.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Controller('/seller')
@ApiTags('seller')
@UseGuards(JwtAuthGuard)
export class CreateSellerController {
  constructor(
    private readonly useCase: CreateSellerService,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  @Post()
  async create(@ValidatedBody() createSellerDto: CreateSellerDTO): Promise<CreateSellerResponseDTO> {
    return this.transactionManager.run(() => this.useCase.execute(createSellerDto));
  }
}
