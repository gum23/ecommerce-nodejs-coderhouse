import { Router } from 'express';
const router = Router();

import * as productsCtrl from '../controllers/products.controller.js'

router.get("/api/products/", productsCtrl.getProducts);

router.get("/api/products/:pid", productsCtrl.getProduct);

router.post("/api/products/", productsCtrl.createProduct);

router.put("/api/products/:pid", productsCtrl.updateProduct);

router.delete("/api/products/:pid", productsCtrl.deleteProduct);

export default router;