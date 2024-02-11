import { Router } from 'express';

const router = Router();

router.get("/contacto", (req,res) => {
    res.render("chat");
})

export default router;