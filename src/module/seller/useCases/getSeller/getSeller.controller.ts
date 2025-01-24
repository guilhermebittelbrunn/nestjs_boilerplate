import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetSellerService } from './getSeller.service';

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Controller('seller')
@ApiTags('seller')
export class GetSellerController {
  constructor(private readonly getSellerService: GetSellerService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.getSellerService.execute(id);
  }
}
