// MAIN JS

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT = 3000 } = process.env;
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// calling to API index.js
app.use("/api", require("./api"));
app.use("/auth", require("./auth"))

// PORT 
app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});


