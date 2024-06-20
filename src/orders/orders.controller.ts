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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, CouponDto } from './dto/dto';
import {
  GetOrderResponseDto,
  UpdateOrderStatusResponseDto,
  CreateOrderResponseDto,
  orderDTO,
} from './dto/order.dto';
@ApiTags('Orders')
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
    return { order, message: 'created successfully' };
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
    return { order, message: 'updated successfully' };
  }

  @Post('apply-coupon')
  @ApiOperation({ summary: 'Apply a coupon to an order' })
  @ApiResponse({
    status: 200,
    description: 'Coupon applied successfully',
    type: orderDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Order already has a coupon or invalid coupon code',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async applyCoupon(@Body(ValidationPipe) couponDto: CouponDto) {
    return await this.orderService.applyCoupon(
      couponDto.couponCode,
      couponDto.orderId,
    );
  }
}
