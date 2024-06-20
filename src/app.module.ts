import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CartModule, DatabaseModule, OrdersModule],
})
export class AppModule {}
