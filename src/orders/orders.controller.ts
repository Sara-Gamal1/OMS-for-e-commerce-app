import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Put,
  Param,
  ValidationPipe,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Post()
  async createOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto.userId);
  }
  @Get(':orderId')
  async getUserCart(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrder(orderId);
  }
  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.orderService.updateOrderStatus(
      orderId,
      updateOrderStatusDto.status,
    );
  }
}
