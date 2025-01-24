import { HttpStatus } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { app } from '@/shared/test/setup';
import { request } from '@/shared/test/utils';

describe('BusinessServiceOrdersController (e2e)', () => {
  let prismaService: PrismaService;

  beforeAll(async () => {
    prismaService = app.get(PrismaService);
  });

  describe('CreateSellerController', () => {
    describe('POST /v1/seller', () => {
      it('should create a seller', async () => {
        const payload = {
          name: 'teste',
        };

        const response = await request().post('/v1/seller').send(payload).expect(HttpStatus.CREATED);

        const { data } = response.body;

        const seller = await prismaService.seller.findUnique({
          where: {
            id: data.id,
          },
        });

        expect(data).toMatchObject(payload);
        expect(seller).toBeTruthy();
      });
    });
  });
});
