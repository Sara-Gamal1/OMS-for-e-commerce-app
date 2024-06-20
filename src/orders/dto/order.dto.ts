import { ApiProperty } from '@nestjs/swagger';

class orderDTO {
  @ApiProperty({ example: 1, description: 'The ID of the created order' })
  orderId: number;

  @ApiProperty({ example: 100.5, description: 'The total price of the order' })
  price: number;

  @ApiProperty({
    example: 'PROCESSING',
    description: 'The status of the order',
  })
  status: string;

  @ApiProperty({ example: 1, description: 'The ID of the user' })
  userId: number;

  @ApiProperty({
    example: '2024-06-20T13:20:59.541Z',
    description: 'order date',
  })
  orderDate: Date;
}

class ProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'The description of the product',
  })
  description: string;

  @ApiProperty({ example: 50.75, description: 'The price of the product' })
  price: number;
}

class ProductInOrderDto {
  @ApiProperty({ type: ProductDto, description: 'Details of the product' })
  product: ProductDto;

  @ApiProperty({ example: 1, description: 'The quantity of the product' })
  quantity: number;
}

export class GetOrderResponseDto {
  @ApiProperty({
    type: [ProductInOrderDto],
    description: 'List of products in the order',
  })
  products: ProductInOrderDto[];

  @ApiProperty({ example: 1, description: 'The ID of the order' })
  orderId: number;

  @ApiProperty({ example: 100.5, description: 'The total price of the order' })
  price: number;

  @ApiProperty({
    example: 'PROCESSING',
    description: 'The status of the order',
  })
  status: string;
}

export class UpdateOrderStatusResponseDto {
  @ApiProperty({ type: orderDTO })
  product: orderDTO;

  @ApiProperty({
    example: 'updated successfully',
    description: 'Success message',
  })
  message: string;
}

export class CreateOrderResponseDto {
  @ApiProperty({ type: orderDTO })
  product: orderDTO;

  @ApiProperty({
    example: 'created successfully',
    description: 'Success message',
  })
  message: string;
}
