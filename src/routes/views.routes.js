import { Router } from "express";
const router = Router();

import ProductManager from "../dao/mongo.classes/ProductManagerMongo.js";

const productManager = new ProductManager();

router.get("/home", async (req, res) => {
  try {
    const limit = req.query.limit;

    const products = await productManager.getProducts(limit);

    res.status(200).render("home.handlebars", { products });
  } catch (error) {
    return error;
  }
});

router.get("/realtimeproducts", (req, res) => {
  const admin = req.session.userData;
  
  res.render("realTimeProducts", {admin});
});

export default router;
