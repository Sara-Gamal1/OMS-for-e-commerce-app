import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getOrderHistory(userId: number) {
    const orders = await this.databaseService.order.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        orderDate: 'desc',
      },
      select: {
        orderId: true,
        status: true,
        orderDate: true,
        price: true,
      },
    });

    if (!orders) {
      throw new NotFoundException('Order history not found');
    }

    return orders.map((order) => ({
      orderId: order.orderId,
      status: order.status,
      orderDate: order.orderDate,
      price: order.price,
      // Map other fields accordingly
    }));
  }
}
