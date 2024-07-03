import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { auth } from '../controllers/products.controller.js';

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

router.get("/current", auth, (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        const user = jwt.verify(cookie, `${config.secret_token}`);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error});
    }
})

export default router;