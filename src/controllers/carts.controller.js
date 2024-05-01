import ProductManagerMongo from "../dao/mongo.classes/ProductManagerMongo.js";
// import CartsMongo from '../dao/mongo.classes/CartsMongo.js';
import CartsManagerMongo from '../dao/mongo.classes/CartsManagerMongo.js';
import moment from 'moment';
import ticketModel from '../dao/db/models/TicketModel.js';
import uuid4 from 'uuid4';

const productManagerMongo = new ProductManagerMongo();
const carsManagerMongo = new CartsManagerMongo();

export const getCar = async (req, res) => {

    try {
        const idCar = req.params.cid;
        const cart = await carsManagerMongo.showProducts(idCar);
        
        req.session.cartPurchase = cart;
        res.status(200).render("cart.handlebars", {cart});
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}

// export const createCart = async (req, res) => {
//     try {
//         const dateNow = moment();
//         const date = dateNow.format('YYYY-MM-DD');
//         const newCar = new CartsMongo([]);
//         const resCreate = await carsManagerMongo.createCar(date, newCar);
        
//         res.status(200).send(resCreate);
//     } catch (error) {
//         res.status(500).send(`Error de servidor ${error}`);
//     }
// }

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
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const getProduct = await productManagerMongo.getProductsById(idProduct);
    
        await carsManagerMongo.addToCar(idCart, getProduct, quantity);

        res.redirect(`/api/carts/${idCart}`);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }
}

export const newQuantity = async (req, res) => {
    const quantity = req.body.quantity || 1;
    
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const getProduct = await productManagerMongo.getProductsById(idProduct);
        
        const result  = await carsManagerMongo.newQuantity(quantity, idCart, getProduct);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error de servidor ${error}`);
    }

}

export const deleteOneProduct = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;

        await carsManagerMongo.deleteOneProduct(idCart, idProduct);

        res.status(200).redirect("/api/carts/65db7e6be4645424b0f0289a");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteAllProducts = async (req, res) => {
    const idCart = req.params.cid;
    console.log(idCart);
    await carsManagerMongo.deleteAllProducts(idCart);
    res.status(200).render("cart.handlebars");
}

export const purchase = async (req, res) => {
    const cart = req.session.cartPurchase;
    const products = cart.products;
    const user = req.session.user;
    
    let productsPurchase = [];
    let productsNotPurchase = [];
    let amount = 0;

    for(const e of products) {
        
        const idProduct = e.product._id;
        const product = await productManagerMongo.getProductsById(idProduct);
        
        if (product.stock >= e.quantity) {
            amount += e.product.price;
            productsPurchase.push(e);
            await carsManagerMongo.deleteOneProduct(user.cart, idProduct);
            await productManagerMongo.updateProduct(product._id, {$inc:{stock: - e.quantity}});
        } else {
            productsNotPurchase.push(e);
        }
    };

    const code = uuid4();
    const currentDate = moment();
    const formatCurrentDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

    const purchase = {
        code: code,
        purchase_datatime: formatCurrentDate,
        amount: amount,
        purchaser: user.email
    };

    const newPurchase = new ticketModel(purchase);
    await newPurchase.save();

    res.status(200).render("purchase.handlebars", {productsPurchase, productsNotPurchase});
}