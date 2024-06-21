import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderHistoryResponseDto } from './dto/order-histroy.dto';
@ApiTags('User')
@Controller('api/users/:userId/orders')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get order history for a user' })
  @ApiParam({ name: 'userId', description: 'User ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The order history for the user',
    type: OrderHistoryResponseDto,
  })
  async getOrderHistory(@Param('userId', ParseIntPipe) userId: number) {
    const orders = await this.userService.getOrderHistory(userId);
    return { orders };
  }
}
