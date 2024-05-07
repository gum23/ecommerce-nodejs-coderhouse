import express from 'express';
import morgan from 'morgan';
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
import { PORT } from './config.js';

import './dao/db/db.js';
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

import { sockets } from './sockets/sockets.js';


const app = express();
const server = createServer(app);
const socketServer = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));
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
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname+"/public"));

app.engine("handlebars", exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
                subTotal: function(quantity, price){
                    return quantity * price;
                }
            }
}));

app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");


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

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

sockets(socketServer);