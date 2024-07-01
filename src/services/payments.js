import Stripe from 'stripe';
import config from '../config.js';

export default class PaymentService {
    constructor(){
        this.stripe = new Stripe(config.private_key_stripe);
    }

    createPaymentIntent = async(data) => {
        const paymentIntent = await this.stripe.checkout.sessions.create(data);
        return paymentIntent;
    }
}