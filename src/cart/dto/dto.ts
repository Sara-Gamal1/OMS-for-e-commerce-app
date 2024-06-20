import { IsInt, IsPositive } from 'class-validator';

export class AddProductToCartDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  userId: number;
}

export class RemoveProductFromCartDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  userId: number;
}

export class UpdateCartDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
