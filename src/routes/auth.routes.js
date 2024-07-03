import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import usersModel from '../dao/db/models/usersModel.js';
import config from '../config.js';

import * as ctrlAuth from '../controllers/auth.controller.js'

const router = Router();


router.post("/register", passport.authenticate('register', {failureRedirect: '/api/failedRegister'}), (req, res) => {
    res.redirect("/api/login");
});

router.get("/failedRegister", (req, res) => {
    res.send("Error al registrar el usuario");
})

router.post("/login", (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        
        if (err) {
            return res.status(500).redirect("/api/failedLogin");
        }
        if (!user) {
            return res.status(401).redirect("/api/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).redirect("/api/login");
            }
            
            const userData = {
                id: user._id || "",
                firstName: user.firstName || "",
                rol: user.rol,
                email: user.email || ""
            }

            if(userData.rol == "Admin"){
                const token = jwt.sign(userData, `${config.secret_token}`, { expiresIn: "1h"});
                res.cookie('coderCookie', token, {maxAge: 3600000}).redirect("/api/products");
                return
            }

            if(userData.rol == "usuario" || userData.rol == "premium"){userData.cart = user.cart._id}
            
            const token = jwt.sign(userData, `${config.secret_token}`, { expiresIn: '1h'});
           
            res.cookie('coderCookie', token, {maxAge: 3600000}).redirect("/api/products");
        })
    })(req, res, next);

});

router.get("/failedLogin", (req, res) => {
    res.send("Error al querer ingresar");
})

router.get("/logout", async (req, res) => {
    const cookie = req.cookies['coderCookie'];
    const user = jwt.verify(cookie, `${config.secret_token}`);
    
    if (user.rol == "Admin") {
        req.session.destroy((err) => {
            if (err) res.send("filed logout!");
    
            res.cookie('coderCookie', '', {maxAge: 0, httpOnly: true}).redirect("/api/login")
        })
        return
    }

    const currentDate = moment();
    const formatCurrentDate = currentDate.format('YYYY-MM-DD');

    await usersModel.findByIdAndUpdate(user.id, {$set: {'last_connection.logout': formatCurrentDate}});

    req.session.destroy((err) => {
        if (err) res.send("filed logout!");

        res.cookie('coderCookie', '', {maxAge: 0, httpOnly: true}).redirect("/api/login")
    })
})

router.post("/forgot-password", ctrlAuth.forgotPassword);

router.get("/new-password/:token", (req, res) => {
    res.render("auth/newPassword.handlebars");
});

router.post("/newPasswordControl", ctrlAuth.passControl);

export default router;