import { IsEnum, IsInt, IsString } from 'class-validator';
import { status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: status.CANCELLED,
    description: 'status of the product',
    enum: ['DELIVERED', 'CANCELLED', 'PROCESSING'],
  })
  @IsEnum(status)
  status: status;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  @IsInt()
  userId: number;
}

export class CouponDto {
  @ApiProperty({ example: 'dfsfds', description: 'coupon code' })
  @IsString()
  couponCode: string;

  @ApiProperty({ example: 1, description: 'The ID of the order' })
  @IsInt()
  orderId: number;
}
