import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { status } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createOrder(userId: number) {
    const cart = await this.databaseService.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      throw new HttpException(
        'Cart not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }
    const productsOnCart = await this.databaseService.productsOnCarts.findMany({
      where: {
        cartId: cart.cartId,
      },
      include: {
        product: true,
      },
    });
    if (productsOnCart.length === 0) {
      throw new HttpException(
        'no products in the cart.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const order = await this.databaseService.order.create({
      data: {
        status: status.WAITING,
        userId: userId,
      },
    });
    let totalPrice = 0;

    const productsOnOrderData = [];
    productsOnCart.forEach(function (product) {
      productsOnOrderData.push({
        productId: product.productId,
        quantity: product.quantity,
        orderId: order.orderId,
      });
      totalPrice += product.product.price * product.quantity;
    });
    await this.databaseService.order.update({
      where: {
        orderId: order.orderId,
      },
      data: {
        price: totalPrice,
      },
    });

    // Insert products into productsOnOrder
    await this.databaseService.productsOnOrders.createMany({
      data: productsOnOrderData,
    });

    // Delete products from productsOnCarts
    await this.databaseService.productsOnCarts.deleteMany({
      where: {
        cartId: cart.cartId,
      },
    });
  }
  async getOrder(orderId: number) {
    const order = await this.databaseService.order.findUnique({
      where: { orderId: orderId },
    });

    if (!order) {
      throw new HttpException('order not found .', HttpStatus.NOT_FOUND);
    }
    const products = await this.databaseService.productsOnOrders.findMany({
      where: {
        orderId: order.orderId,
      },
      select: {
        product: {
          select: {
            name: true,
            description: true,
            price: true,
          },
        },
        quantity: true,
      },
    });

    const result = {
      products: products,
      orderId: order.orderId,
      price: order.price,
    };
    return result;
  }
  async updateOrderStatus(orderId: number, status: status) {
    const order = await this.databaseService.order.findUnique({
      where: { orderId: orderId },
    });

    if (!order) {
      throw new HttpException('order not found .', HttpStatus.NOT_FOUND);
    }
    return await this.databaseService.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: status,
      },
    });
  }
}
