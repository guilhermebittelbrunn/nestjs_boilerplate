import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { AsyncLocalStorage } from 'async_hooks';

import Marketplace from '@/module/marketplace/domain/marketplace.domain';

export interface AlsData {
  marketplace: Marketplace;
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >;
}

@Injectable()
export class Als extends AsyncLocalStorage<AlsData> {}
