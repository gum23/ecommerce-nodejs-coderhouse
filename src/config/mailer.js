import nodemailer from 'nodemailer';
import config from '../config.js';

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: `${config.email}`,
        pass: `${config.password_email}`,
    },
});

export const mail = async (req, res) => {
    const user = req.session.user;
    
    let message = await transporter.sendMail({
        from: `Ecommerce CoderHouse <${config.email}>`,
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

export const recoverPass = async (req, res) => {
    const mailData = req.session.mailData;

    let message = await transporter.sendMail({
        from: `Ecommerce CoderHouse <${config.email}>`,
        to: `${mailData.email}`,
        subject: "Recover password",
        text: "Recupero de su clave",
        html: `
        <div>
            <h2>Haga click en el boton de abajo</h2>
            </br>
            <p>
                El siguiente botón lo redireccionará a una vista donde podrá
                restablecer su contraseña.
                </br>Tenga en cuenta que no podrá ser la misma.
            </p>
            </br>
            <a href="${mailData.link}"><button>Link</button></a>
        </div>
        `
    });

    req.session.token = mailData.token;

    res.render("mailPassword.handlebars");
}



