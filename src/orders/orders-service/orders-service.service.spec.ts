import { Test, TestingModule } from '@nestjs/testing';
import { OrdersServiceService } from './orders-service.service';

describe('OrdersServiceService', () => {
  let service: OrdersServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersServiceService],
    }).compile();

    service = module.get<OrdersServiceService>(OrdersServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
