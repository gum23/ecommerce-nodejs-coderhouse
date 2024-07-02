import { Router } from 'express';
import {auth} from '../controllers/products.controller.js';

const router = Router();

router.get("/contacto", auth, (req,res) => {
    res.render("chat");
})

export default router;