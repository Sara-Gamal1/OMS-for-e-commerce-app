import { Test, TestingModule } from '@nestjs/testing';
import { OrdersControllerController } from './orders-controller.controller';

describe('OrdersControllerController', () => {
  let controller: OrdersControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersControllerController],
    }).compile();

    controller = module.get<OrdersControllerController>(OrdersControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
