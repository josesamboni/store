// MAIN JS
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { PORT = 3000 } = process.env;
const jwt=require("jsonwebtoken")


app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(  (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    req.user = null;
  }

  next();
}   )

// calling to API Backend Routes index.js
app.use("/api", require("./api"));
app.use("/auth", require("./auth"))

// PORT 
app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
