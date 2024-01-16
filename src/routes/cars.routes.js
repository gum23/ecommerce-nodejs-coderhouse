import { Router } from 'express';
const router = Router();

import * as carsCtrl from '../controllers/cars.controller.js';

router.get("/api/carts/:cid", carsCtrl.getCar);

router.post("/api/carts", carsCtrl.createCart);

router.post("/api/carts/:cid/product/:pid", carsCtrl.addProduct);

export default router;