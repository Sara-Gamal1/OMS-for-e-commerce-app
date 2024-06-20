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

    let totalPrice = 0;

    const productsOnOrderData = [];
    const productUpdates = [];
    for (const item of productsOnCart) {
      if (item.quantity > item.product.stock) {
        throw new HttpException('Product not in stock.', HttpStatus.CONFLICT);
      }

      totalPrice += item.product.price * item.quantity;
      productsOnOrderData.push({
        productId: item.productId,
        quantity: item.quantity,
        orderId: null, // Placeholder
      });

      productUpdates.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }
    const order = await this.databaseService.order.create({
      data: {
        status: status.WAITING,
        price: totalPrice,
        userId: userId,
      },
    });
    productsOnOrderData.forEach((item) => (item.orderId = order.orderId));
    await Promise.all(
      productUpdates.map((update) =>
        this.databaseService.product.update({
          where: { productId: update.productId },
          data: { stock: { decrement: update.quantity } },
        }),
      ),
    );

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
    return order;
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
      status: order.status,
    };
    return result;
  }
  async updateOrderStatus(orderId: number, Status: status) {
    const order = await this.databaseService.order.findUnique({
      where: { orderId: orderId },
      include: {
        products: true,
      },
    });
    if (!order) {
      throw new HttpException('order not found .', HttpStatus.NOT_FOUND);
    }
    if (Status == status.CANCELLED && order.status == status.WAITING) {
      await Promise.all(
        order.products.map((update) =>
          this.databaseService.product.update({
            where: { productId: update.productId },
            data: { stock: { increment: update.quantity } },
          }),
        ),
      );
    }

    return await this.databaseService.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: Status,
      },
    });
  }
}
