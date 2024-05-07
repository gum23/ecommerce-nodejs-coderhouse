import { Router } from 'express';
import { generateProducts } from '../mocking/products.mocking.js';

const router = Router();

router.get("/mockingproducts", (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts());
    }

    res.status(200).send({products});
})

export default router;