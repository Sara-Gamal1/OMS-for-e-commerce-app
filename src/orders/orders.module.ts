import { Module } from '@nestjs/common';
import { OrdersControllerController } from './orders-controller/orders-controller.controller';
import { OrdersService } from './orders-service/orders-service.service';

@Module({
  controllers: [OrdersControllerController],
  providers: [OrdersService],
})
export class OrdersModule {}
