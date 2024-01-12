import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = 8080;

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Funciona correctamente");
    console.log("This is the endpoint get '/'");
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})