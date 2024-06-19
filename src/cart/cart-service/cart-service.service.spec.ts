import { Test, TestingModule } from '@nestjs/testing';
import { CartServiceService } from './cart-service.service';

describe('CartServiceService', () => {
  let service: CartServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartServiceService],
    }).compile();

    service = module.get<CartServiceService>(CartServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
