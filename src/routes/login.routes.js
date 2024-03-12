import { Router } from 'express';

const router = Router();

router.get("/login", (req, res) => {
    res.render("auth/login.handlebars")
});

router.get("/register", (req, res) => {
    res.render("auth/register.handlebars")
});

export default router;