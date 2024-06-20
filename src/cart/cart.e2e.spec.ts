import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
let db;
async function DB() {
  await prisma.productsOnCarts.deleteMany({});
  await prisma.productsOnOrders.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA',
      password: 'password1',
      cart: {
        create: {},
      },
    },
    include: {
      cart: true,
    },
  });

  // Seed products
  const product1 = await prisma.product.create({
    data: {
      name: 'Toy Car',
      description: 'A miniature car for kids',
      price: 15.99,
      stock: 10,
    },
  });

  await prisma.productsOnCarts.create({
    data: {
      productId: product1.productId,
      cartId: user1.cart.cartId,
    },
  });
  return { user1, product1 };
}

describe('CartController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    db = await DB();
  }, 10000);

  afterAll(async () => {
    await app.close();
  });
  it('GET /api/cart/:userId should retrieve the user cart', async () => {
    const userId = db.user1.userId;

    const response = await request(app.getHttpServer())
      .get(`/api/cart/${userId}`)
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('name', db.product1.name);
    expect(response.body[0]).toHaveProperty('price', db.product1.price);
    expect(response.body[0]).toHaveProperty('quantity', 1);
  }, 10000);
  it('DELETE /api/cart/remove should remove a product from the cart', async () => {
    const userId = db.user1.userId;
    const productId = db.product1.productId;

    const response = await request(app.getHttpServer())
      .delete(`/api/cart/remove`)
      .send({ userId, productId })
      .expect(HttpStatus.OK);

    expect(response.body.message).toBe('removed from cart successfully');
    expect(response.body.removedProduct).toHaveProperty(
      'name',
      db.product1.name,
    );
    expect(response.body.removedProduct).toHaveProperty(
      'price',
      db.product1.price,
    );
    const productsOnCarts = await prisma.productsOnCarts.findMany({
      where: { productId: db.product1.productId },
    });
    expect(productsOnCarts.length).toBe(0);
  });
  it('POST /api/cart/add should add a product to the cart', async () => {
    const userId = db.user1.userId;
    const productId = db.product1.productId;

    await request(app.getHttpServer())
      .post(`/api/cart/add`)
      .send({ userId, productId })
      .expect(HttpStatus.CREATED);

    const productsOnCarts = await prisma.productsOnCarts.findMany({
      where: { productId: db.product1.productId },
    });
    expect(productsOnCarts.length).toBe(1);
    expect(productsOnCarts[0].quantity).toBe(1);
  }, 20000);

  it('PUT /api/cart/update should update the quantity of a product in the cart', async () => {
    const userId = db.user1.userId;
    const productId = db.product1.productId;
    const quantity = 2;

    const response = await request(app.getHttpServer())
      .put(`/api/cart/update`)
      .send({ userId, productId, quantity })
      .expect(HttpStatus.OK);

    expect(response.body.message).toBe('updated successfully');
    expect(response.body.updatedProduct).toHaveProperty(
      'name',
      db.product1.name,
    );
    expect(response.body.updatedProduct).toHaveProperty(
      'price',
      db.product1.price,
    );
    expect(response.body.updatedProduct.quantity).toBe(quantity);
  });
});
