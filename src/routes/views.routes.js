import { Router } from 'express';
const router = Router();

import * as productsCtrl from '../controllers/views.controller.js';


router.get("/home", productsCtrl.getProducts);

router.get("/realtimeproducts", productsCtrl.getRealTimeProd);

export default router;