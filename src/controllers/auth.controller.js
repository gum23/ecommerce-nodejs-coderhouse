import usersModel from '../dao/db/models/usersModel.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { createHash, compareHashAndPass } from '../utils/bcrypt.util.js';

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    
    if (!email) {
        return res.status(400).json({message: "Debe ingresr el email"})
    }

    const message = "Haga click en el botón que le enviamos a su email";
    let verificationLink;

    try {
        const user = await usersModel.findOne({email: email});
        
        const tokenJWT = jwt.sign({userId: user._id, username: user.email}, `${config.secret_token}`, {expiresIn: '1h'});
        
        verificationLink = `http://localhost:${config.port}/api/new-password/${tokenJWT}`;

        const mailData = {
            link: verificationLink,
            email: email,
            token: tokenJWT
        }
    
        req.session.mailData = mailData;
        
        user.resetToken = tokenJWT;
    } catch (error) {

        return res.json({message, other: "llegó aquí!"});
    }

    

    res.redirect("/api/recoverPassword");

}

export const passControl = async (req, res) => {
    const token = req.session.token;
    const newPass = req.body;

    let data;
    try {
        data = jwt.verify(token, `${config.secret_token}`)
    } catch (error) {
        return res.json({message: "El token ha vencido!"});
    }

    const user = await usersModel.findOne({email: data.username});
    const comparepass = compareHashAndPass(newPass.password, user);

    if (comparepass == true) {
        return res.json({message: "La contraseña no puede ser igual a la anterior!"});
    } 

    const newPassCrypt = await createHash(newPass.password);
    await usersModel.findByIdAndUpdate(data.userId, {password: newPassCrypt});

    res.redirect("/api/login");
}