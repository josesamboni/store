// // This is connecting the ROUTES

const express = require("express");
const router = express.Router();

router.use("/product", require("./product")); 
router.use("/order", require("./order"));
router.use("/cart", require("./cart"));

module.exports = router;