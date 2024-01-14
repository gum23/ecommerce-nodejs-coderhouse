import express from 'express';
import morgan from 'morgan';

import routesProducts from './routes/products.routes.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(morgan("dev"));

app.use(routesProducts);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})