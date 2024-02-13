// // ROUTES

const express = require("express");
const router = express.Router();

router.use("/product", require("./product")); 
router.use("/order", require("./order"));
router.use("/lineItems", require("./lineItems"));

module.exports = router;