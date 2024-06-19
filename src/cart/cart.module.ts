import { Module } from '@nestjs/common';
import { CartControllerController } from './cart-controller/cart-controller.controller';
import { CartService } from './cart-service/cart-service.service';

@Module({
  controllers: [CartControllerController],
  providers: [CartService],
})
export class CartModule {}
