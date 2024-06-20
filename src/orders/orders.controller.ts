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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/dto';
import {
  GetOrderResponseDto,
  UpdateOrderStatusResponseDto,
  CreateOrderResponseDto,
} from './dto/order.dto';
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'The created order',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async createOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto.userId);
    return { order, messgae: 'created successfully' };
  }
  @Get(':orderId')
  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order details',
    type: GetOrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getUserCart(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrder(orderId);
  }
  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update order status by ID' })
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiResponse({
    status: 200,
    description: 'The updated order',
    type: UpdateOrderStatusResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.orderService.updateOrderStatus(
      orderId,
      updateOrderStatusDto.status,
    );
    return { order, messgae: 'updated successfully' };
  }
}
