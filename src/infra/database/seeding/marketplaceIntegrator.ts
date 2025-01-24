import { MarketplaceIntegratorModel } from '@prisma/client';

import { MarketplaceIntegratorType } from '../../../shared/types/integrator';

export const marketplaceIntegratorSeeding: MarketplaceIntegratorModel[] = [
  {
    id: '8fca4c69-7823-4450-9295-904bc1285900',
    marketplaceId: '71b4e62a-9d4a-4018-be27-1f7154171819',
    type: MarketplaceIntegratorType.ZOOP,
    isDefault: true,
    metadata: {
      marketplace_id: '86727613f5694237803f6c3466929a09',
      seller_Id: 'db8a0958950e4958a4123802dae171db',
      key: 'zpk_test_JtOKXzAKgB4iRpH5RRXFFymL',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
];
