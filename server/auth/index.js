//this page is for users
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register new account
router.post("/register", async (req, res, next) => {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await prisma.post.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin: true
    })
    res.send(user)
})

module.exports = router;
