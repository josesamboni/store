const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const user = [
  {
    firstName: "Milo",
    lastName: "Smith",
    email: "milo@gmail.com",
    password: "milo4445",
    isAdmin: true,
  },

  {
    firstName: "Tyrice",
    lastName: "Freeman",
    email: "tyrice@gmail.com",
    password: "tyrice444",
    isAdmin: true,
  },

  {
    firstName: "Fiona",
    lastName: "Zheng",
    email: "fiona@gmail.com",
    password: "Fiona5888",
    isAdmin: true,
  },
];

const products = [
  {
    productName: "Skittles",
    description:
      "Skittles consist of hard sugar shells imprinted with the letter 'S', similar to M&M's which have the letter 'M'. The interior consists mainly of sugar, corn syrup, and hydrogenated palm kernel oil along with fruit juice, citric acid, and natural and artificial flavors.",
    price: 2.99,
  },

  {
    productName: "KitKat",
    description:
      "Kit Kat (stylised as KitKat in various countries) is a chocolate-covered wafer bar confection created by Rowntree's of York, United Kingdom.",
    price: 3.99,
  },

  {
    productName: "Snickers",
    description:
      "Snickers is a brand of chocolate bar consisting of nougat topped with caramel and peanuts, all encased in milk chocolate.",
    price: 1.99,
  },

  {
    productName: "Hard Candy",
    description:
      "A hard candy is a sugar candy prepared from one or more sugar-based syrups that is heated to a temperature of 160 °C (320 °F) to make candy.",
    price: 8.99,
  },
];

const order = [
  {
    userId: 1,
    isCart: true,
  },
];

const lineItems = [
  {
    orderId: 1,
    productId: 2,
    quantity: 3,
  },
];

// function
const generateData = async () => {
  await prisma.lineItems.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "user_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "product_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "order_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "lineitems_id_seq" RESTART WITH 1`;

  await prisma.user.createMany({
    data: user,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.order.createMany({
    data: order,
  });

  await prisma.lineItems.createMany({
    data: lineItems,
  });
};

generateData();
