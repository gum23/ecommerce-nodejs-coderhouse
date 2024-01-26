import { Router } from 'express';
const router = Router();

import ProductManager from "../classes/ProductManager.js";

const productManager = new ProductManager();


router.get("/home", async (req, res) => {

    await productManager.initialize();
  
    try {
      // const limit = req.query.limit;
      // const limitNum = parseInt(limit);
  
      const products = await productManager.getProducts();

      res.status(200).render("home.handlebars", {products});

    } catch (error) {
      return error;
    }
  
  });

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeProducts");
});

export default router;