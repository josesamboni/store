//this page is for users
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// POST || Register/Create new User Account || TEST APPROVED!

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
        isadmin: true,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ token, email: user.email });
  } catch (error) {
    next(error);
  }
});

//POST || Login to an existing account || TEST APPROVED!
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    next(error);
  }
});


// GET || Get the currently logged in user || TEST APPROVED!
router.get("/me", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: (req.user.id),
      },
    });
    if (!user) {
      return res.status(404).send("user not found.");
    }

//delete bc you dont want to send back the password to the user

    // delete user.password;
    // //get costumers orders
    // const order = await prisma.order.findFirst({
    // where: { userid: req.user.id },
    // });

    res.send(user);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
