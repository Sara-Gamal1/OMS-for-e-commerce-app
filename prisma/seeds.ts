import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('Clearing existing data from the database...');

  await prisma.productsOnCarts.deleteMany({});
  await prisma.productsOnOrders.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.coupon.deleteMany({});
  console.log('Database cleared successfully!');
}

async function seedData() {
  // Call clearDatabase function to clear existing data
  await clearDatabase();

  // Seed users
  await prisma.user.create({
    data: {
      userId: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA',
      password: 'password1',
      cart: {
        create: {},
      },
    },
  });

  await prisma.user.create({
    data: {
      userId: 2,

      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, Smalltown, USA',
      password: 'password2',
      cart: {
        create: {},
      },
      // No orders created for user2 in this example
    },
  });

  await prisma.user.create({
    data: {
      userId: 3,

      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      address: '789 Elm Rd, Villageville, USA',
      password: 'password3',
      cart: {
        create: {},
      },
      // No orders created for user3 in this example
    },
  });

  // Seed products
  await prisma.product.create({
    data: {
      productId: 1,
      name: 'Toy Car',
      description: 'A miniature car for kids',
      price: 15.99,
      stock: 10,
    },
  });

  await prisma.product.create({
    data: {
      productId: 2,

      name: 'Doll',
      description: 'A doll with movable parts',
      price: 12.99,
      stock: 8,
    },
  });

  await prisma.product.create({
    data: {
      productId: 3,

      name: 'Board Game',
      description: 'A family board game',
      price: 24.99,
      stock: 5,
    },
  });
const coupons = [
    {
      code: 'DISCOUNT10',
      discount: 10.0,
      expiryDate: new Date('2024-12-31'),
    },
    {
      code: 'SAVE20',
      discount: 20.0,
      expiryDate: new Date('2024-12-31'),
    },
    {
      code: 'FREESHIP',
      discount: 5.0,
      expiryDate: new Date('2024-12-31'),
    },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.createMany({
      data: coupon,
    });
  }
  console.log('Seed data created successfully!');
}

async function main() {
  try {
    await seedData();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
