import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import moment from 'moment';
import usersModel from '../dao/db/models/usersModel.js';

const router = Router();

router.get("/github", passport.authenticate("github"));

router.get("/signIn/github", passport.authenticate("github", { failureRedirect: '/api/login'}), async (req, res) => {

    const data = {
        id: req.user._id,
        firstName: req.user.github.username || "",
        email: req.user.email || "",
        rol: req.user.rol,
        cart: req.user.cart
    }

    const currentDate = moment();
    const formatCurrentDate = currentDate.format('YYYY-MM-DD');
    
    await usersModel.findByIdAndUpdate(data.id, {$set: {'last_connection.login': formatCurrentDate}});

    const token = jwt.sign(data, `${config.secret_token}`, {expiresIn: "1h"});

    res.cookie('coderCookie', token, {maxAge: 3600000}).status(200).redirect("/api/products");
});

export default router;