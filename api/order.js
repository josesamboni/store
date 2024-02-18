const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

//POST ||   Create an Order for an existing User || TEST APPROVED!
router.post("/", async (req, res, next) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: req.body.userId,
        total: req.body.total,
      },
    });
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

// PUT ||  Update an Order by orderID Number ||
router.put("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        userId: req.body.userId,
        total: req.body.total,
        //user: { connect: { id: req.user.id } },
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

//GET || Get an Order by UserID 
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);

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

//GET || Get the Order by ORDERID NUMBER
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

  //Find all order details referring to the Order ID
  const results = [];
  for (let order of orders) {
    const orderdetails = await prisma.orderdetails.findMany({
      where: {
        orderid: order.id,
      },
    });
    results.push({ order, orderdetails });
  }

//DELETE   || Deleting an order
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

    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

