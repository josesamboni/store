const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// //route
// router.get("/", async (req, res, next) => {{
//   try {
//     res.send('this is the router');
//   } catch (error) {
//     next(error);
//   }
// }})

// log in


// register 

// get costumer by id

// get costumers orders



module.exports = router;


