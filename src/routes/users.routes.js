import { Router } from 'express';
import usersModel from '../dao/db/models/usersModel.js';
import moment from 'moment';

const router = Router();

router.get("/users/premium/:uid", (req, res) => {
    const user = req.session.user;
    return res.render("changeRol.handlebars", {user});
});

router.post("/users/premium", async (req, res) => {
    const dataBody = req.body;
    const user = req.session.user;

    try {
        const result = await usersModel.findByIdAndUpdate(user.id, {rol: dataBody.rol}, {new: true});
        
        user.rol = result.rol;
        
        res.redirect("/api/products");
    } catch (error) {
        res.send(error);
    }
});

router.get("/users", async (req, res) => {
    const users = await usersModel.find();

    const calculateDaysOfInactivity = (lastLogoutDate) => {
        const currentDate = moment();
        const lastLogoutMoment = moment(lastLogoutDate,'YYYY-MM-DD');
        const duration = moment.duration(currentDate.diff(lastLogoutMoment));
        let daysOfInactivity = parseInt(duration.asDays()) >= 0 ? parseInt(duration.asDays()) : 'Campo Vacio';
        return daysOfInactivity;
    }

    let usersData = [];
    users.map(e => {
        usersData.push({
            firstName: e.firstName,
            email: e.email,
            rol: e.rol,
            daysOfInactivity: calculateDaysOfInactivity(e.last_connection.logout)
        })
    });

    res.render("users.handlebars", {usersData})
});

router.delete("/users", async (req, res) => {
    try {
        const users = await usersModel.find();

        const calculateDaysOfInactivity = (lastLoginDate) => {
            const currentDate = moment();
            const lastLoginMoment = moment(lastLoginDate,'YYYY-MM-DD');
            const duration = moment.duration(currentDate.diff(lastLoginMoment));
            let daysOfInactivity = parseInt(duration.asDays()) >= 0 ? parseInt(duration.asDays()) : 'Campo Vacio';
            return daysOfInactivity;
        }

        let usersDelete = [];
        let emailDelete = {emails: ""};

        users.map(e => {
            const inactivity = calculateDaysOfInactivity(e.last_connection.logout);

            if (inactivity >= 2) {
                usersDelete.push(e._id);
                emailDelete.emails += `${e.email}, `;
            }
        });

        const result = await usersModel.deleteMany({_id: {$in: usersDelete}});
        
        req.session.emailDelete = emailDelete;

        res.status(200).send({ message: `${result.deletedCount} usuarios eliminados` });
        
    } catch (error) {
        res.status(500).send({error: error})
    }

});

router.put("/users/premium", async (req, res) => {
    try {
        const data = req.body;

        const result = await usersModel.updateOne({email: data.email}, {rol: data.rol}, {new: true});

        res.status(200).send({message: `${result.modifiedCount} rol modificado correctamente`});
    } catch (error) {
        res.status(500).send({error: error});
    }
})

export default router;