import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get("/login", (req, res) => {
    res.render("auth/login.handlebars")
});

router.get("/register", (req, res) => {
    res.render("auth/register.handlebars")
});

router.get("/forgot-password", (req, res) => {
    res.render("auth/forgotPassword.handlebars")
});

router.get("/current", (req, res) => {
    // const user = req.session.user;
    const cookie = req.cookies['coderCookie'];
    const user = jwt.verify(cookie, 'coderSecret');
    res.status(200).json(user)
})

export default router;