import { Test, TestingModule } from '@nestjs/testing';
import { CartControllerController } from './cart-controller.controller';

describe('CartControllerController', () => {
  let controller: CartControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartControllerController],
    }).compile();

    controller = module.get<CartControllerController>(CartControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
