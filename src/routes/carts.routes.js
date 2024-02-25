import { Router } from 'express';
const router = Router();

import * as cartsCtrl from '../controllers/carts.controller.js';

router.get("/carts/:cid", cartsCtrl.getCar);

router.post("/carts", cartsCtrl.createCart);

router.post("/carts/:cid/product/:pid", cartsCtrl.addProduct);

router.delete("/carts/:cid/product/:pid", cartsCtrl.deleteOneProduct);

router.delete("/carts/:cid", cartsCtrl.deleteAllProducts);

export default router;