const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 


// GET/api/product     ||Getting all products ||Test Approved
router.get('/', async(req, res, next) =>{
    try{
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// GET/api/product/:id || Get single product by ID|| ||Test Approved
router.get('/:id', async (req, res, next) => {
    try{
        const singleProduct = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (singleProduct) {
            res.json(singleProduct);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        next(err);
    }
});

//POST || Create new product
router.post("/", async (req, res, next) => {
    try {
      const { productName, description, price, imageUrl } = req.body;
      const product = await prisma.product.create({
        data: {
          productName,
          description,
          price,
          imageUrl,
        },
      });
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  });
  

// DELETE/api/products/:id
// router.delete('/:id', async (req, res, next) => {
//     try {
//          const product = await prisma.product.delete({
//           where: {
//           id: Number(req.params.id),
//         },
//       });
//       if (!product) {
//         return res.status(404).send("Product not found.");
//       }
//       res.send(product);
//     } catch (error) {
//       next(error);
//     }
//   });


module.exports = router;