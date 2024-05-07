import { Router } from 'express';
const router = Router();

import * as cartsCtrl from '../controllers/carts.controller.js';

router.get("/carts/:cid", cartsCtrl.getCar);

router.post("/carts/:cid/product/:pid", cartsCtrl.addProduct);

router.put("/carts/:cid/product/:pid", cartsCtrl.newQuantity);

router.delete("/carts/:cid/product/:pid", cartsCtrl.deleteOneProduct);

router.delete("/carts/:cid", cartsCtrl.deleteAllProducts);

router.get("/:cid/purchase", cartsCtrl.purchase);

export default router;