import { Router } from 'express';
const router = Router();

import * as carsCtrl from '../controllers/cars.controller.js';

router.get("/carts/:cid", carsCtrl.getCar);

router.post("/carts", carsCtrl.createCart);

router.post("/carts/:cid/product/:pid", carsCtrl.addProduct);

export default router;