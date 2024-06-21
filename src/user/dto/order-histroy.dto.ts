import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  price: number;
}

export class OrderHistoryResponseDto {
  @ApiProperty({ type: [OrderDto] })
  orders: OrderDto[];
}
