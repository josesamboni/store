//this page is for users
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register new account
router.post("/register", async (req, res, next) => {
  try {
    const salt = 8;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: true,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

//log in
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    //bcrypt password
    const match = await bcrypt.compare(req.body.password, user?.password);
    if (!match) {
      return res.status(401).send("try credentials again");
    }
    //create token with userID
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// get costumer by ID
router.get("/me", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.body.id),
      },
    });
    if (!user) {
      return res.status(404).send("user not found.");
    }

    //delete bc you dont want to send back the password to the user
    delete user.password;
    // get costumers order info baaes
    const order = await prisma.order.findFirst({
      where: { userid: req.user.id },
    });

    res.send(order, user);
  } catch (error) {
    next(error);
  }
});

// "firstName": "jose",
// "lastName":  "samboni",
// "email":     "dfas@gmail.com",
// "password":  "sdgw456",
// "isAdmin":    true

module.exports = router;
