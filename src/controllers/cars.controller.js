import ProductManager from "../classes/ProductManager.js";
import Cars from '../classes/Cars.js';
import CarsManager from '../classes/CarsManager.js';
import ProductOfCar from '../classes/ProductOfCar.js';

const productManager = new ProductManager();
const carsManager = new CarsManager();

export const getCar = async (req, res) => {
    await carsManager.initialize();

    try {
        const idCar = req.params.cid;
        const result = await carsManager.showProducts(idCar);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}

export const createCart = async (req, res) => {
    await carsManager.initialize();

    try {
        const car = new Cars([]);
        const result = await carsManager.createCar(car);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}

export const addProduct = async (req, res) => {
    await productManager.initialize();
    await carsManager.initialize();

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
        const getProduct = await productManager.getProductsById(idProduct);
        const product = new ProductOfCar(
            getProduct.id,
            quantity
        );

        const result = await carsManager.addToCar(idCars, product);

        res.send(result);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}