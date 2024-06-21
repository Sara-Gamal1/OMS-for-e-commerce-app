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
  await prisma.coupon.deleteMany({});
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
  await prisma.coupon.create({
    data: {
      code: 'DISCOUNT10',
      discount: 10.0,
      expiryDate: new Date('2024-12-31'),
    },
  });
  return { user1, product1 };
}
describe('OrdersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  afterAll(async () => {
    await app.close();
  });

  it('/POST api/orders (Create Order) - should create a new order', async () => {
    db = await DB();
    const createOrderDto = { userId: db.user1.userId };

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .send(createOrderDto)
      .expect(HttpStatus.CREATED);

    expect(response.body.message).toEqual('created successfully');
    const product = await prisma.productsOnOrders.findMany({
      where: {
        productId: db.product1.productId,
      },
    });
    expect(product).not.toBeNull();
  }, 20000);

  it('/GET api/orders/:orderId (Get Order) - should retrieve order details', async () => {
    db = await DB();
    const createOrderDto = { userId: db.user1.userId }; // Adjust this based on your DTO structure
    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .send(createOrderDto);
    const orderId = response.body.order.orderId;

    const response1 = await request(app.getHttpServer())
      .get(`/api/orders/${orderId}`)
      .expect(HttpStatus.OK);

    expect(response1.body.orderId).toEqual(orderId);
    expect(response1.body.products.length).toBe(1);
    expect(response1.body.price).toBe(db.product1.price);
    expect(response1.body.products[0].product.name).toBe(db.product1.name);
  }, 20000);

  it('/PUT api/orders/:orderId/status (Update Order Status) - should update order status', async () => {
    db = await DB();
    const createOrderDto = { userId: db.user1.userId }; // Adjust this based on your DTO structure
    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .send(createOrderDto);
    const orderId = response.body.order.orderId;
    const updateOrderStatusDto = { status: 'DELIVERED' }; // Adjust based on your DTO structure

    const response1 = await request(app.getHttpServer())
      .put(`/api/orders/${orderId}/status`)
      .send(updateOrderStatusDto)
      .expect(HttpStatus.OK);

    expect(response1.body.message).toEqual('updated successfully');
    const order = await prisma.order.findFirst({ where: { orderId: orderId } });
    expect(order.status).toBe('DELIVERED');
  }, 20000);

  it('/POST api/orders/apply-coupon (Apply Coupon) - should apply a coupon to an order', async () => {
    db = await DB();
    const createOrderDto = { userId: db.user1.userId };
    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .send(createOrderDto);
    const orderId = response.body.order.orderId;

    const couponDto = { couponCode: 'DISCOUNT10', orderId: orderId };

    const response1 = await request(app.getHttpServer())
      .post('/api/orders/apply-coupon')
      .send(couponDto)
      .expect(HttpStatus.CREATED);

    expect(response1.body.price).toBe(
      db.product1.price - 0.1 * db.product1.price,
    );
  }, 20000);
});
