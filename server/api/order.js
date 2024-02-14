const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

//POST ||   Create a new Order 
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



// PUT ||  Update an Order
router.put("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        userId: req.body.userId,
        isCart: true,
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


// //GET || Get an Order by UserID
router.get("/:orderId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)){
      return res.status(400).send("Invalid user ID.");
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: userId,
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


//GET || Get the Order by ID
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

