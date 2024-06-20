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

  console.log('Database cleared successfully!');
}

async function seedData() {
  // Call clearDatabase function to clear existing data
  await clearDatabase();

  // Seed users
  await prisma.user.create({
    data: {
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
      name: 'Toy Car',
      description: 'A miniature car for kids',
      price: 15.99,
      stock: 10,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Doll',
      description: 'A doll with movable parts',
      price: 12.99,
      stock: 8,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Board Game',
      description: 'A family board game',
      price: 24.99,
      stock: 5,
    },
  });

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
