require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT = 3000 } = process.env;
const router = express();
const bodyParser = require("body-parser");


router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended:false}))

router.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
router.use(cors(corsOptions));

//router.use("/api", require("./api/index.js"));
// router.use("/auth", require("/api/auth"))

router.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});

module.exports = router;
