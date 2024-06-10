import { Router } from 'express';
import usersModel from '../dao/db/models/usersModel.js';

const router = Router();

router.get("/users/premium/:uid", (req, res) => {
    const user = req.session.user;
    return res.render("changeRol.handlebars", {user});
});

router.post("/users/premium", async (req, res) => {
    const dataBody = req.body;
    const user = req.session.user;

    try {
        await usersModel.findByIdAndUpdate(user.id, {rol: dataBody.rol})

        req.session.userData = user;
        return res.redirect("/api/products");
    } catch (error) {
        res.json({Error: error});
    }
})

export default router;