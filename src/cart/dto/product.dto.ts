// add-product-to-cart-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

class ProductDto {
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  productId: number;

  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the product',
  })
  description: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'The quantity of the product in the cart',
  })
  quantity: number;

  @ApiProperty({
    example: 10,
    description: 'The stock of the product',
  })
  stock: number;
}

export class AddProductToCartResponseDto {
  @ApiProperty({ type: ProductDto })
  product: ProductDto;

  @ApiProperty({
    example: 'added to cart successfully',
    description: 'Success message',
  })
  message: string;
}

export class RemoveProductFromCartResponseDto {
  @ApiProperty({ type: ProductDto })
  product: ProductDto;

  @ApiProperty({
    example: 'removed from cart successfully',
    description: 'Success message',
  })
  message: string;
}

export class UpdateProductDTO {
  @ApiProperty({ type: ProductDto })
  product: ProductDto;

  @ApiProperty({
    example: 'updated successfully',
    description: 'Success message',
  })
  message: string;
}

export class GetCartDto {
  @ApiProperty({
    type: [ProductDto],
    description: 'Array of products in the cart',
  })
  products: ProductDto[];
}
