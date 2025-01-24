import { PrismaClient } from '@prisma/client';

import { marketplaceSeeding } from './marketplace';
import { marketplaceIntegratorSeeding } from './marketplaceIntegrator';

export async function runSeeding(prisma: PrismaClient) {
  console.info('Seeding started...');

  /** Marketplace */
  await Promise.all(
    marketplaceSeeding.map((marketplace) =>
      prisma.marketplaceModel.upsert({
        where: { id: marketplace.id },
        update: {},
        create: marketplace,
      }),
    ),
  );

  /** Marketplace Integrator */
  await Promise.all(
    marketplaceIntegratorSeeding.map((marketplaceIntegrator) =>
      prisma.marketplaceIntegratorModel.upsert({
        where: { id: marketplaceIntegrator.id },
        update: {},
        create: marketplaceIntegrator,
      }),
    ),
  );

  console.info('Seed completed!');
}
