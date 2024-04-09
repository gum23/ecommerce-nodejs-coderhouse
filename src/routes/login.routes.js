import { Router } from 'express';

const router = Router();

router.get("/login", (req, res) => {
    res.render("auth/login.handlebars")
});

router.get("/register", (req, res) => {
    res.render("auth/register.handlebars")
});

router.get("/current", (req, res) => {
    const user = req.session.user;
    res.status(200).json(user)
})

export default router;