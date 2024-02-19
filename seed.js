const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const user = [
  {
    firstName: "Milo",
    lastName: "Smith",
    email: "milo@gmail.com",
    password: "milo4445",
    isadmin: true,
  },

  {
    firstName: "Tyrice",
    lastName: "Freeman",
    email: "tyrice@gmail.com",
    password: "tyrice444",
    isadmin: true,
  },

  {
    firstName: "Fiona",
    lastName: "Zheng",
    email: "fiona@gmail.com",
    password: "Fiona5888",
    isadmin: true,
  },
];

//Revised Data 
const product = [
  { productName: "Bubble Gum",
    description: "Bubble gum candy is a soft and chewy sweet treat, offering a delightful and nostalgic experience for candy enthusiasts of all ages.",
    price: 1.99,
    imageUrl: "https://assets3.thrillist.com/v1/image/3062675/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg"
  },

  {
    productName: "Dark and Milk Chocolates",
    description: "Chocolate is a beloved treat enjoyed by people all over the world. They are decadent confections made from cocoa beans, which are the seeds of the cacao tree",
    price: 9.99,
    imageUrl: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2022/04/12/fn_healthy-chocolate-getty_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1649787692492.jpeg"
  },

  {
    productName: "Taffy Candy",
    description: "Taffy is a soft and chewy candy that is typically made from sugar, corn syrup, butter, and flavorings.",
    price: 1.99,
    imageUrl: "https://m.media-amazon.com/images/I/716nwFasHOL._SX679_.jpg"
  },

  {
    productName: "Hard Candy",
    description: "A hard candy is a sugar candy prepared from one or more sugar-based syrups that is heated to a temperature of 160 °C (320 °F) to make candy.",
    price: 7.99,
    imageUrl: "https://www.secretcandyshop.com/cdn/shop/products/hard_candy_watermelon.jpg?v=1658213364"
  },
];


const order = [
  {
    userId: 1,
    isCart: true,
  },
];

//Deleted Cart

//Added OrderDetails
const orderDetail = [
  {
    productId: 2,
    orderId: 1,
    quantity: 3,
  },
];

//Rearraigned order to avoid Key constraints (violations)
// function
const generateData = async () => {
  await prisma.orderDetail.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
 
  await prisma.$executeRaw`ALTER SEQUENCE "user_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "product_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "order_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "orderDetail_id_seq" RESTART WITH 1`;
 

  //Create users & products
  await prisma.user.createMany({ data: user });
  await prisma.product.createMany({ data: product });

  //create orders
  await prisma.order.createMany({ data: order });
  //create orderDetails
  await prisma.orderDetail.createMany({ data: orderDetail });
 
};

generateData();

