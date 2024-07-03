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
        <div style="margin: 0 auto; border: 1px solid green; width: max-content; padding: 28px;">
            <h2>Aviso de compra terminada</h2>
            </br>
            <p>Su compra se ha registrado correctamente</p>
            </br>
            <p>El pago fué exitoso!!</p>
            </br>
            <p>¡¡Gracias por su compra!!</p>
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
        <div style="margin: 0 auto; border: 1px solid green; width: max-content; padding: 28px;">
            <h2>Haga click en el boton de abajo</h2>
            </br>
            <p>El siguiente botón lo redireccionará a una vista</p>
            </br>
            <p> donde podrá restablecer su contraseña.</p>
            </br>
            <p>Tenga en cuenta que no podrá ser la misma.</p>
            </br>
            <h4>Recuerde que el link vence pasado un tiempo</h4>
            </br>
            <a href="${mailData.link}"><button>Link</button></a>
        </div>
        `
    });

    req.session.token = mailData.token;

    res.render("mailPassword.handlebars");
}

export const deleteUsers = async (req, res) => {
    const emails = req.session.emailDelete;
    
    let message = await transporter.sendMail({
        from: `Ecommerce CoderHouse <${config.email}>`,
        to: `${emails.emails}`,
        subject: "Usuarios eliminados por inactividad",
        text: "Su cuenta ha sido eliminada por inactividad",
        html: `
        <div style="margin: 0 auto; border: 1px solid black; width: max-content; padding: 28px;">
            <h2>Su cuenta ha sido eliminada por inactividad</h2>
            </br>
            <p>La inactividad limite para no tener este inconveniente
               es de 2 días.
            </p>
            </br>
            <p>
               Pasado ese plazo se eliminará la cuenta,
               sucederá de la misma forma, si llegase a terner
               otra cuenta.
            </p>
            </br>
            <p>
                Evite inconenientes
            </p>
            </br>
            <p>
               Atte. Ecommerce CoderHouse
            </p>
        </div>
        `
    });
}

export const deleteProduct = async (req, res) => {
    const data = req.session.deleteProduct;

    let message = await transporter.sendMail({
        from: `Ecommerce CoderHouse <${config.email}>`,
        to: `${data.owner}`,
        subject: "Producto eliminado",
        text: "Se ha eliminado un producto suyo",
        html: `
        <div style="margin: 0 auto; border: 1px solid red; width: max-content; padding: 28px;">
            <h2>Producto eliminado</h2>
            </br>
            <p>El Administrador ha decidido eliminar un producto suyo</p>
            </br>
            <p>Con el titulo: ${data.title}</p>
        </div>
        `
    })
}



