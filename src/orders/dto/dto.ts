import { IsEnum, IsInt } from 'class-validator';
import { status } from '@prisma/client';

export class UpdateOrderStatusDto {
  @IsEnum(status)
  status: status;
}

export class CreateOrderDto {
  @IsInt()
  userId: number;
}
