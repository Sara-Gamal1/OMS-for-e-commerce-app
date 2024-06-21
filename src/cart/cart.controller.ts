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

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AddProductToCartResponseDto,
  RemoveProductFromCartResponseDto,
  GetCartDto,
  UpdateProductDTO,
} from './dto/product.dto';
@ApiTags('Cart')
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Add a product to the cart' })
  @ApiBody({ type: AddProductToCartDto })
  @ApiResponse({
    status: 201,
    description: 'Product added to cart successfully.',
    type: AddProductToCartResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Cart not found for the user.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Product not in stock.' })
  async addProductToCart(
    @Body(ValidationPipe) addProductToCartDto: AddProductToCartDto,
  ) {
    const product = await this.cartService.addToCart(
      addProductToCartDto.productId,
      addProductToCartDto.userId,
    );
    return { product, message: 'added to cart successfully' };
  }

  @Delete('/remove')
  @ApiOperation({ summary: 'Remove a product from the cart' })
  @ApiBody({ type: RemoveProductFromCartDto })
  @ApiResponse({
    status: 200,
    description: 'Product removed from cart successfully.',
    type: RemoveProductFromCartResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Cart not found for the user.' })
  @ApiResponse({ status: 404, description: 'Product not found in the cart.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async removeProductFromCart(
    @Body(ValidationPipe) removeProductFromCartDto: RemoveProductFromCartDto,
  ) {
    const removedProduct = await this.cartService.removeProductFromCart(
      removeProductFromCartDto.productId,
      removeProductFromCartDto.userId,
    );
    return { removedProduct, message: 'removed from cart successfully' };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user cart by user ID' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully retrieved.',
    type: GetCartDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Cart not found for the user.' })
  async getUserCart(@Param('userId', ParseIntPipe) userId: number) {
    return await this.cartService.getCart(userId);
  }
  @Put('/update')
  @ApiOperation({ summary: 'Update the quantity of a product in the cart' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully updated.',
    type: UpdateProductDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Cart or product not found.' })
  @ApiResponse({ status: 409, description: 'Product not in stock.' })
  async updateCart(@Body(ValidationPipe) updateCartDto: UpdateCartDto) {
    {
      const updatedProduct = await this.cartService.updateCart(
        updateCartDto.productId,
        updateCartDto.userId,
        updateCartDto.quantity,
      );
      return { updatedProduct, message: 'updated successfully' };
    }
  }
}
