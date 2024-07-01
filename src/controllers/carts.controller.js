import ProductManagerMongo from "../dao/mongo.classes/ProductManagerMongo.js";
import CartsManagerMongo from '../dao/mongo.classes/CartsManagerMongo.js';
import moment from 'moment';
import ticketModel from '../dao/db/models/TicketModel.js';
import uuid4 from 'uuid4';
import CustomError from "../services/errors/CustomError.js";
import { generateCartErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import jwt from 'jsonwebtoken';
import config from '../config.js';

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

export const addProduct = async (req, res) => {

    const quantity = req.body.quantity;

    if(quantity == null || quantity == "") {
        CustomError.createError({
            name: "Add product to cart error",
            cause: generateCartErrorInfo({quantity}),
            message: "No ingreso cantidad",
            code: EErrors.ERR_PROPERTY_EMPTY
        });
    }
    
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        
        const cookie = req.cookies['coderCookie'];
        const user = jwt.verify(cookie, `${config.secret_token}`);
        
        const getProduct = await productManagerMongo.getProductsById(idProduct);

        if (user.email == getProduct.owner) {
            req.session.userData = user;
            return res.redirect("/api/products");
        }
    
        await carsManagerMongo.addToCar(idCart, getProduct, quantity);
        
        res.redirect(`/api/carts/${idCart}`);
    } catch (error) {
        console.error(error.cause);
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

        res.status(200).send("Se eliminó correctamente");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteAllProducts = async (req, res) => {
    const idCart = req.params.cid;
    await carsManagerMongo.deleteAllProducts(idCart);

    res.status(200).send("Se vació el carrito");
}

export const purchase = async (req, res) => {
    try {
        const cart = req.session.cartPurchase;
        const products = cart.products;
        const user = req.session.user;
        
        let productsPurchase = [];
        let productsNotPurchase = [];
        let amount = 0;

        let updateProducts = [];

        for(const e of products) {
            
            const idProduct = e.product._id;
            const product = await productManagerMongo.getProductsById(idProduct);

            if (e.quantity == 0) {
                req.session.userData = user;
                return res.redirect("/api/products");
            }
            
            if (product.stock >= e.quantity) {
                amount += e.product.price;
                productsPurchase.push(e);

                const updateProduct = {
                    id: product._id,
                    quantity: e.quantity
                }
                
                updateProducts.push(updateProduct);

            } else {
                productsNotPurchase.push(e);
            }
        };
        
        req.session.updateProducts = updateProducts;
        req.session.deleteProduct = {cart: user.cart}

        const code = uuid4();
        const currentDate = moment();
        const formatCurrentDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

        const purchase = {
            code: code,
            purchase_datatime: formatCurrentDate,
            amount: amount,
            purchaser: user.email
        };
        
        let newPurchase;
        if (updateProducts.length > 0) {
            newPurchase = new ticketModel(purchase);
            await newPurchase.save();
        }

        req.session.newPurchase = newPurchase;

        res.status(200).render("purchase.handlebars", {productsPurchase, productsNotPurchase, newPurchase});
    } catch (error) {
        res.status(500).send("Error de servidor", error);
    }
}