const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 


// GET/api/products
router.get('/', async(req, res, next) =>{
    try{
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// GET/api/products/:id
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

// GET/api/products/getOrder
// router.get('/getOrder', async (req, res,next) => {
//     try{
//         const order = await prisma.order.findFirst({
//             where: { userId: req.user.id },
//             include: {
//                 lineItems: {
//                     include: {
//                         product: true,
//                     },

//                 },
//             },
//         });
//         res.json(order);
//     } catch (err) {
//         next(err);
//     }
// });

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