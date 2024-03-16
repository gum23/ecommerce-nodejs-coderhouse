import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get("/github", passport.authenticate("github", {}), (req, res) => {});

router.get("/signIn/github", passport.authenticate("github", {}), (req, res) => {
    
    req.session.userData = req.user;

    return res.status(200).redirect("/api/products");
});

export default router;