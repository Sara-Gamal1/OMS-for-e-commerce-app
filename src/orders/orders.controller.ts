import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Query,
  Put,
  Param,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { status } from '@prisma/client';
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Post()
  async createOrder(@Body() body: { userId: number }) {
    return await this.orderService.createOrder(body.userId);
  }
  @Get()
  async getUserCart(@Query('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrder(orderId);
  }
  @Put('status')
  async updateOrderStatus(
    @Query('orderId', ParseIntPipe) orderId: number,
    @Body() body: { status: status },
  ) {
    return await this.orderService.updateOrderStatus(orderId, body.status);
  }
}
