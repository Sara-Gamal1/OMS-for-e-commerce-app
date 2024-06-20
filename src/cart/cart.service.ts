import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addToCart(productId: number, userId: number) {
    // Find the cart for the user
    const cart = await this.databaseService.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      throw new HttpException(
        'Cart not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the product already exists in the cart
    const productInCart = await this.databaseService.productsOnCarts.findFirst({
      where: {
        cartId: cart.cartId,
        productId: productId,
      },
      include: {
        product: true,
      },
    });

    if (productInCart) {
      if (productInCart.product.stock < productInCart.quantity + 1) {
        throw new HttpException('product not in stock.', HttpStatus.CONFLICT);
      }

      // Product already in the cart, increase quantity by 1
      const updatedProductInCart =
        await this.databaseService.productsOnCarts.update({
          where: {
            cartId_productId: {
              cartId: cart.cartId,
              productId: productId,
            },
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      return updatedProductInCart;
    } else {
      const product = await this.databaseService.product.findFirst({
        where: { productId: productId },
      });
      if (product.stock < 1) {
        throw new HttpException('product not in stock.', HttpStatus.CONFLICT);
      }
      // Product not in the cart, add it with quantity 1
      const newProductInCart =
        await this.databaseService.productsOnCarts.create({
          data: {
            cartId: cart.cartId,
            productId: productId,
            quantity: 1,
          },
        });
      return newProductInCart;
    }
  }
  async getCart(userId: number) {
    // Find the cart for the user
    const cart = await this.databaseService.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      throw new HttpException(
        'Cart not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.databaseService.productsOnCarts.findMany({
      where: {
        cartId: cart.cartId,
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
  }

  async removeProductFromCart(productId: number, userId: number) {
    const cart = await this.databaseService.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      throw new HttpException(
        'Cart not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }
    const productInCart = await this.databaseService.productsOnCarts.findFirst({
      where: {
        cartId: cart.cartId,
        productId: productId,
      },
    });

    if (!productInCart) {
      throw new HttpException(
        'product not found in the cart.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (productInCart.quantity == 1)
      await this.databaseService.productsOnCarts.delete({
        where: {
          cartId_productId: {
            cartId: cart.cartId,
            productId: productId,
          },
        },
      });
    else
      return await this.databaseService.productsOnCarts.update({
        where: {
          cartId_productId: {
            cartId: cart.cartId,
            productId: productId,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
  }
  async updateCart(productId: number, userId: number, quantity: number) {
    const cart = await this.databaseService.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      throw new HttpException(
        'Cart not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }
    const productInCart = await this.databaseService.productsOnCarts.findFirst({
      where: {
        cartId: cart.cartId,
        productId: productId,
      },
      include: {
        product: true,
      },
    });

    if (!productInCart) {
      throw new HttpException(
        'product not found in the cart.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (productInCart.product.stock < quantity) {
      throw new HttpException('product not in stock.', HttpStatus.CONFLICT);
    }
    if (quantity <= 0)
      await this.databaseService.productsOnCarts.delete({
        where: {
          cartId_productId: {
            cartId: cart.cartId,
            productId: productId,
          },
        },
      });
    else
      return await this.databaseService.productsOnCarts.update({
        where: {
          cartId_productId: {
            cartId: cart.cartId,
            productId: productId,
          },
        },
        data: {
          quantity: quantity,
        },
      });
  }
}
