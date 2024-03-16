import { Router } from 'express';
// import usersModel from '../dao/db/models/usersModel.js';
// import userManager from '../dao/mongo.classes/userManager.js';
// import { createHash, compareHashAndPass } from '../utils/bcrypt.util.js'
import passport from 'passport';

const router = Router();


router.post("/register", passport.authenticate('register', {failureRedirect: '/api/failedRegister'}), (req, res) => {
    res.redirect("/api/login");
});

router.get("/failedRegister", (req, res) => {
    res.send("Error al registrar el usuario");
})

// router.post("/login", async (req, res) => {
//     let {email, password} = req.body;

//     if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
//         const admin = {admin: "administrador"}
//         req.session.userData = admin;
//         return res.redirect("/api/products");
//     }

//     const userFound = await usersModel.findOne({email: email});
//     if (!userFound) {
//            return res.redirect("/api/login");   
//     }
    
//     let userCompare = compareHashAndPass(password, userFound);
//     if (userCompare == false) {
//         return res.send("Hay un error en su email y/o en su contraseña");
//     }

//     const userData = {
//         firstName: userFound.firstName,
//         rol: userFound.rol
//     };
    
//     req.session.userData = userData

//     res.redirect("/api/products");
// })

router.post("/login", (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return res.status(500).redirect("/api/failedLogin");
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).redirect("/api/login");
            }
            const userData = {
                firstName: user.firstName || "",
                rol: user.rol
            }
            req.session.userData = userData;
            res.status(200).redirect("/api/products");
        })
    })(req, res, next);

});

router.get("/failedLogin", (req, res) => {
    res.send("Error al querer ingresar");
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) res.send("filed logout!");

        res.redirect("/api/login")
    })
})

export default router;