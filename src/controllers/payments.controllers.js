import ticketModel from '../dao/db/models/TicketModel.js';
import PaymentService from '../services/payments.js';
// import config from '../config.js';
import CartsManagerMongo from '../dao/mongo.classes/CartsManagerMongo.js';
import ProductManagerMongo from '../dao/mongo.classes/ProductManagerMongo.js';

const productManagerMongo = new ProductManagerMongo();
const carsManagerMongo = new CartsManagerMongo();

export const paymentIntent = async (req, res) => {
    
    try {
        const ticketFound = await ticketModel.findOne({code: req.body.code});
        if(!ticketFound) return res.status(400).send({status: "error", error: "Ticket not found"});

        //Objeto de pago
        const paymentIntentInfo = {
            payment_method_types: ['card'],
            line_items: [
            {
                price_data: {
                currency: 'ars',
                product_data: {
                    name: 'varios',
                },
                unit_amount: ticketFound.amount*100,
                },
                quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: `https://ecommerce-nodejs-coderhouse-production.up.railway.app/api/success`,
            cancel_url: `https://ecommerce-nodejs-coderhouse-production.up.railway.app/api/cancel`,
        }

        const service = new PaymentService;
        const result = await service.createPaymentIntent(paymentIntentInfo);
        
        res.send({status: "success", payload: result});
    } catch (error) {
        res.status(500).send({status: "error", error: "Ocurrió un error con el proveedor"})
    }
}

export const successPayment = async (req, res) => {
    const updateProducts = req.session.updateProducts;
    const deleteProduct = req.session.deleteProduct;

    for(const e of updateProducts){
        await productManagerMongo.updateProduct(e.id, {$inc:{stock: - e.quantity}});
        await carsManagerMongo.deleteOneProduct(deleteProduct.cart, e.id);
    }

    res.redirect("/api/mail");
}

export const cancelPayment = async (req, res) => {
    const data = req.session.newPurchase;

    await ticketModel.findByIdAndDelete(data._id);

    res.redirect("/api/products");
}