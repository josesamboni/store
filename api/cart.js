const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();


//GET || Getting all items in the CART //and send modified CART to client 
router.get("/", async (req, res, next) => {
    try {
//Retrieving cart from DB looking for all cart items 
//where the userid is equal to 1.
      const cart = await prisma.cart.findMany({
        where: {
          userid: Number(1),
        },
      });
      let result = [];
      //This loop iterates over each cart item in the DB.
      for (let x of cart) {
        result.push({
          ...x,
          productDescription: await prisma.product.findFirst({
            where: {
              id: x.productid,
            },
          }),
        });
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  });

  //POST || Creating the CART 
  router.post("/", async (req, res, next) => {
    try {
      const add = await prisma.cart.create({
        data: {
          userid: req.user.id,
          productid: req.body.id,
        },
      });
      return res.send(add);
    } catch (error) {
      next(error);
    }
  });
  

  //Delete  ||Deleting the CART 
  router.delete("/", async (req, res, next) => {
    try {
      const checkout = await prisma.cart.delete({
        where: {
          productid: req.body.id,
        },
      });
      return res.send(checkout);
    } catch (error) {
      next(error);
    }
  });




module.exports = router;