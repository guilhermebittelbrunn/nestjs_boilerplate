import { Test, TestingModule } from '@nestjs/testing';

import { GetSellerService } from './getSeller.service';

import { ISellerRepository, ISellerRepositorySymbol } from '@/repositories/seller.repository.interface';

describe('GetSellerService', () => {
  let service: GetSellerService;
  let sellerRepoMock: jest.Mocked<ISellerRepository>;

  beforeEach(async () => {
    sellerRepoMock = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<ISellerRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSellerService,
        {
          provide: ISellerRepositorySymbol,
          useValue: sellerRepoMock,
        },
      ],
    }).compile();

    service = module.get<GetSellerService>(GetSellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findById with correct ID', async () => {
    const mockSeller = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    const id = '1';

    sellerRepoMock.findById.mockResolvedValue(mockSeller);

    const result = await service.execute(id);

    expect(sellerRepoMock.findById).toHaveBeenCalledWith(id);

    expect(result).toEqual(mockSeller);
  });
});
