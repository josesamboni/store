const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();


//POST || Admin can view orders from id ||TEST APPROVED!
//Added a loop
router.post("/customer", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("Need to login");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user.isadmin) {
      return res.send("Not admin user");
    }

    //Admin finding all orders by user Id
    const orders = await prisma.order.findMany({
      where: {
        userId: req.body.id,
      },
    });

//Finding all order details by orderId using a For Loop
//The end result will contain an Array with objects representing an Order associated with Order details. 
const results = [];
    for (let order of orders) {
      const orderDetail = await prisma.orderDetail.findMany({
        where: {
          orderId: order.id,
        },
      });
      results.push({ order, orderDetail });
    }
     //Finding all product description of order details using a For Loop. 
     const array = [];
    for (let order of results) {
      const productInfo = [];
      for (let orders of order.orderDetail) {
        productInfo.push({
          ...orders,
          productDescription: await prisma.product.findFirst({
            where: {
              id: orders.productId,
            },
          }),
        });
      }
      array.push({ ...order.order, productInfo });
    }

    res.send(array);
  } catch (error) {
    next(error);
  }
});

// POST ||   Create an Order for an existing User || TEST APPROVED!
router.post("/", async (req, res, next) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: req.body.userId,
        isCart: true,
      },
    });
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

// // PUT ||  Update an Order by orderID Number || TEST APPROVED!
router.put("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        userId: req.body.userId,
        isCart: true,
      },
    });

    if (!order) {
      return res.status(404).send("order not found.");
    }

    res.send(order);
  } catch (error) {
    next(error);
  }
});

// //GET || Get All Orders by UserID || TEST APPROVED!
router.get("/user/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)){
      return res.status(400).send("Invalid user ID.");
    }
    const order = await prisma.order.findMany({
      where: {
        userId: userId, 
      },
    });

    if (!order || order.length === 0) {
      return res.status(404).send("Order not found.");
    }
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// //GET || Get Single Order by ORDERID ||TEST APPROVED!
router.get("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!order) {
      return res.status(404).send("Order not found.");
    }
    
    res.send(order);
  } catch (error) {
    next(error);
  }
});

 

// //DELETE   || Deleting an order || TEST APPROVED!
router.delete("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!order) {
      return res.status(404).send("Order not found.");
    }

    res.send(array);
  } catch (error) {
    next(error);
  }
});

module.exports = router;