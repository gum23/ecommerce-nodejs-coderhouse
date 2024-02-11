import express from 'express';
import morgan from 'morgan';
import handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { createServer } from 'http';
import { Server } from 'socket.io';
import __dirname from './dirname.util.js';

import './dao/db/db.js';
import routesProducts from './routes/products.routes.js';
import routesCars from './routes/cars.routes.js';
import routesViews from './routes/views.routes.js';
import routesContact from './routes/contact.routes.js';
import { sockets } from './sockets/sockets.js';


const PORT = 8080;

const app = express();
const server = createServer(app);
const socketServer = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

app.use(express.static(__dirname+"/public"));

app.engine("handlebars", exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.use("/api", routesProducts);
app.use("/api", routesCars);
app.use("/api", routesViews);
app.use("/api", routesContact);

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

sockets(socketServer);