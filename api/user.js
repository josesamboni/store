const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 

// GET || Get all Users in the DB  ||Test Approved
router.get("/", async (req, res, next) => {
    try {
      const user = await prisma.user.findMany();
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
  
  // GET || Get the User by id  ||Test Approved
  router.get("/:id", async (req, res, next) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
  
  //POST || Create a new User ||Test Approved
  router.post("/", async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  });
  
  //PUT || Update a single User info ||
  router.put("/:id", async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;