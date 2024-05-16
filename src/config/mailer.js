import nodemailer from 'nodemailer';
import EMAIL from '../config.js';
import PASSWORD_EMAIL from '../config.js'

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: `${EMAIL}`,
        pass: `${PASSWORD_EMAIL}`,
    },
});

export const mail = async (req, res) => {
    const user = req.session.user;
    
    let message = await transporter.sendMail({
        from: `Ecommerce CoderHouse <${EMAIL}>`,
        to: `${user.email}`,
        subject: "Compra en Ecommerce",
        text: "Su compra se a registrado correctamente",
        html: `
        <div>
            <p>Su compra se ha registrado correctamente</p>
        </div>
        `
    });
    
    req.session.userData = user;

    res.redirect(`/api/products`)
}



