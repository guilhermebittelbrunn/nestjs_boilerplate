import { Test, TestingModule } from '@nestjs/testing';
import { Seller } from '@prisma/client';

import { CreateSellerService } from './createSeller.service';
import { CreateSellerDTO } from './dto/createSeller.dto';

import { ISellerRepository, ISellerRepositorySymbol } from '@/repositories/seller.repository.interface';
import { AlsModule } from '@/shared/config/als/als.module';

describe('CreateSellerService', () => {
  let service: CreateSellerService;
  let sellerRepositoryMock: jest.Mocked<ISellerRepository>;

  beforeEach(async () => {
    sellerRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AlsModule],
      providers: [
        CreateSellerService,
        {
          provide: ISellerRepositorySymbol,
          useValue: sellerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CreateSellerService>(CreateSellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the sellerRepo.create method with correct data', async () => {
    const dto: CreateSellerDTO = { name: 'John Doe' };
    const mockSeller: Seller = { id: '1', name: 'John Doe' };

    sellerRepositoryMock.create.mockResolvedValue(mockSeller);

    const result = await service.execute(dto);

    expect(sellerRepositoryMock.create).toHaveBeenCalledWith(dto);

    expect(result).toEqual(mockSeller);
  });
});
