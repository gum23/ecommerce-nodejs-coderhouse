import { Router } from 'express';

import * as ctrlPayments from '../controllers/payments.controllers.js';

const router = Router();

router.post("/payment-intents", ctrlPayments.paymentIntent);

router.get("/success", (req, res) => {
    res.render("successPayment.handlebars");
});

router.post("/success", ctrlPayments.successPayment);

router.get("/cancel", (req, res) => {
    res.render("cancelPayment.handlebars");
});

router.post("/cancel", ctrlPayments.cancelPayment);

export default router;