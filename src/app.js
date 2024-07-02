import express from 'express';
import handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { createServer } from 'http';
import { Server } from 'socket.io';
import __dirname from './dirname.util.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import {initializePassport} from './config/passport.js';
import passport from 'passport';
import compression from 'express-compression';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import config  from './config.js';
import cors from 'cors';

import { addLogger } from './utils/logger.js';

import db from './dao/db/db.js';
import routesProducts from './routes/products.routes.js';
import routesCarts from './routes/carts.routes.js';
import routesViews from './routes/views.routes.js';
import routesContact from './routes/contact.routes.js';
import routesAuth from './routes/auth.routes.js';
import routesLogin from './routes/login.routes.js';
import routesInit from './routes/pathInit.routes.js';
import routesGithub from './routes/github.routes.js';
import routesMailer from './routes/mailer.routes.js';
import routesMocking from './routes/mocking.routes.js';
import routesLogger from './routes/logger.routes.js';
import routesUsers from './routes/users.routes.js';
import routesPayments from './routes/payments.routes.js';

import { sockets } from './sockets/sockets.js';


const app = express();
const server = createServer(app);
const socketServer = new Server(server);
app.use(cors());

db();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion api ecommerce nodejs Coderhouse",
            description: "Documentacion usando Swagger"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

initializePassport();
app.use(passport.initialize());

app.use(cookieParser());
app.use(session({
    store: mongoStore.create({
        mongoUrl: "mongodb+srv://ecommerce:7zrPwBUSYfhVYqPj@practicaintegradoraclus.ghxzurn.mongodb.net/ecommerce",
        ttl: 300
    }),
    secret: "cursoNodeCoder",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(express.static(__dirname+"/public"));

app.engine("handlebars", exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
                subTotal: function(quantity, price){
                    return quantity * price;
                },
                valueRol: function(userRol, options) {
                    if (userRol == "premium") {
                        return options.fn(this);
                    } else if(userRol == "Admin") {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                },
                buttonDelete: function(owner, user, options){
                    
                    if (user.rol == 'Admin') {
                        return options.fn(this);
                    } else if(owner == user.email){
                        return options.fn(this);
                    }
                    return options.inverse(this);
                },
                admin: function(rol, options) {
                    if (rol == "Admin") {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                },
                valueCart: function(rol, options){
                    if (rol != "Admin") {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                },
                buttonComprar: function(cart, options){
                    if (cart.products.length >= 1) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                },
                notPurchase: function(products, options){
                    if (products.length > 0) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                },
                pay: function(products, options){
                    if (products.length > 0) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                }
            }
}));

app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.use(addLogger);

app.use("/", routesInit);
app.use("/api", routesLogin);
app.use("/api", routesProducts);
app.use("/api", routesCarts);
app.use("/api", routesViews);
app.use("/api", routesContact);
app.use("/api", routesAuth);
app.use("/api", routesGithub);
app.use("/api", routesMailer);
app.use("/api", routesMocking);
app.use("/api", routesLogger);
app.use("/api", routesUsers);
app.use("/api", routesPayments);

const port = config.port;
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

sockets(socketServer);