import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('/add')
  async addProductToCart(@Body() body: { productId: number; userId: number }) {
    return await this.cartService.addToCart(body.productId, body.userId);
  }

  @Delete('/remove')
  async removeProductFromCart(
    @Body() body: { productId: number; userId: number },
  ) {
    return await this.cartService.removeProductFromCart(
      body.productId,
      body.userId,
    );
  }

  @Get()
  async getUserCart(@Query('userId', ParseIntPipe) userId: number) {
    return await this.cartService.getCart(userId);
  }
  @Put('/update')
  async updateCart(
    @Body() body: { productId: number; userId: number; quantity: number },
  ) {
    {
      return await this.cartService.updateCart(
        body.productId,
        body.userId,
        body.quantity,
      );
    }
  }
}
