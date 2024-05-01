import { Router } from 'express';
import passport from 'passport';

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
                firstName: user.firstName || "",
                rol: user.rol,
                email: user.email || ""
            }

            if(userData.rol == "Admin"){
                req.session.userData = userData;
                res.status(200).redirect("/api/realtimeproducts")
                return
            }
            if(userData.rol == "usuario"){userData.cart = user.cart._id}
            
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