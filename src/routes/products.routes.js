import { Router } from 'express';
const router = Router();

import * as productsCtrl from '../controllers/products.controller.js';

router.get("/products/", productsCtrl.auth, productsCtrl.getProducts);

router.get("/products/:pid", productsCtrl.getProduct);

router.post("/products/", productsCtrl.createProduct);

router.put("/products/:pid", productsCtrl.updateProduct);

router.delete("/products/:pid", productsCtrl.deleteProduct);

router.get("/newProduct/", (req, res) => {
    res.render("createProduct.handlebars")
})

export default router;