import ProductManagerMongo from "../dao/mongo.classes/ProductManagerMongo.js";
import CarsMongo from '../dao/mongo.classes/CarsMongo.js';
import CarsManagerMongo from '../dao/mongo.classes/CarsManagerMongo.js';
import ProductOfCarMongo from '../dao/mongo.classes/ProductOfCarMongo.js';

const productManagerMongo = new ProductManagerMongo();
const carsManagerMongo = new CarsManagerMongo();

export const getCar = async (req, res) => {

    try {
        const idCar = req.params.cid;
        console.log(idCar);
        const result = await carsManagerMongo.showProducts(idCar);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}

export const createCart = async (req, res) => {
    try {
        const newCar = new CarsMongo([]);
        const resCreate = await carsManagerMongo.createCar(newCar);
        
        res.status(200).send(resCreate);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}

export const addProduct = async (req, res) => {

    const quantity = req.body.quantity;
   

    if(quantity == null) {
        return res.status(400).send({
            messageOne: "Debe de ingresar la cantidad",
            messageTwo: "En body seleccione JSON",
            messageThree: "Escriba un json con clave=quantity y valor numérico que desee"
        });
    }
    
    try {
        const idCars = req.params.cid;
        const idProduct = req.params.pid;
        const getProduct = await productManagerMongo.getProductsById(idProduct);
        const product = new ProductOfCarMongo(
            getProduct.id,
            quantity
        );

        const result = await carsManagerMongo.addToCar(idCars, product);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}