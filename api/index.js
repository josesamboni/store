// // This is connecting the ROUTES

const express = require("express");
const router = express.Router();

router.use("/product", require("./product"));
router.use("/order", require("./order"));
router.use("/user", require("./user"));


module.exports = router;