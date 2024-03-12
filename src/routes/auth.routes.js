import { Router } from 'express';
import usersModel from '../dao/db/models/usersModel.js';
import userManager from '../dao/mongo.classes/userManager.js';


const router = Router();

router.post("/register", async (req, res) => {
    const rol = 'usuario';
    let {firstName, lastName, email, age, password} = req.body;
    
    const user = new userManager(
        firstName,
        lastName,
        email,
        age,
        rol,
        password
    );
    
    await usersModel.create(user);
    res.redirect("/api/login");
})

router.post("/login", async (req, res) => {
    let {email, password} = req.body;

    if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
        const admin = {admin: "administrador"}
        req.session.userData = admin;
        return res.redirect("/api/products");
    }
    const userFound = await usersModel.findOne({email: email, password: password});
    if (!userFound) {
        return res.send("Credenciales incorrectas!")   
    }

    const userData = {
        firstName: userFound.firstName,
        rol: userFound.rol
    };
    
    req.session.userData = userData

    res.redirect("/api/products");
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) res.send("filed logout!");

        res.redirect("/api/login")
    })
})

export default router;