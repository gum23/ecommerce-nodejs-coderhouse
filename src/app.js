import express from 'express';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';
import __dirname from './dirname.util.js';

import routesProducts from './routes/products.routes.js';
import routesCars from './routes/cars.routes.js';
import routesViews from './routes/views.routes.js';

// import ProductManager from './classes/ProductManager.js'

const PORT = 8080;

const app = express();
const server = createServer(app);
const io = new Server(server);

// const productManager = ProductManager();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

app.use(express.static(__dirname+"/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.set("io", io);
io.on("connection", (socket) => {
    console.log("Conectado");
});

app.use("/api", routesProducts);
app.use("/api", routesCars);
app.use("/api", routesViews);

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});