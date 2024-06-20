import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Delete,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  AddProductToCartDto,
  RemoveProductFromCartDto,
  UpdateCartDto,
} from './dto/dto';
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async addProductToCart(
    @Body(ValidationPipe) addProductToCartDto: AddProductToCartDto,
  ) {
    return await this.cartService.addToCart(
      addProductToCartDto.productId,
      addProductToCartDto.userId,
    );
  }

  @Delete('/remove')
  async removeProductFromCart(
    @Body(ValidationPipe) removeProductFromCartDto: RemoveProductFromCartDto,
  ) {
    return await this.cartService.removeProductFromCart(
      removeProductFromCartDto.productId,
      removeProductFromCartDto.userId,
    );
  }

  @Get(':userId')
  async getUserCart(@Param('userId', ParseIntPipe) userId: number) {
    return await this.cartService.getCart(userId);
  }
  @Put('/update')
  async updateCart(@Body(ValidationPipe) updateCartDto: UpdateCartDto) {
    {
      return await this.cartService.updateCart(
        updateCartDto.productId,
        updateCartDto.userId,
        updateCartDto.quantity,
      );
    }
  }
}
