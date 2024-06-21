import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CartModule, DatabaseModule, OrdersModule, UserModule],
})
export class AppModule {}
