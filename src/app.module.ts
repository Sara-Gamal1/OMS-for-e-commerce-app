import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CartModule, DatabaseModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
