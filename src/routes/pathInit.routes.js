import { Router } from 'express';
const router = Router();

router.get("/", (req, res) => {
    res.redirect("/api/login");
});  

export default router;