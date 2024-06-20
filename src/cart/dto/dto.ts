import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCartDto {
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  @IsInt()
  @IsPositive()
  productId: number;
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  @IsInt()
  @IsPositive()
  userId: number;
}

export class RemoveProductFromCartDto {
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  @IsInt()
  @IsPositive()
  productId: number;
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  @IsInt()
  @IsPositive()
  userId: number;
}

export class UpdateCartDto {
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  @IsInt()
  @IsPositive()
  productId: number;
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  @IsInt()
  @IsPositive()
  userId: number;
  @ApiProperty({ example: 1, description: 'The quantity of the product' })
  @IsInt()
  @IsPositive()
  quantity: number;
}
