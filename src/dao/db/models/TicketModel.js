import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        trim: true
    },
    purchase_datatime: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    purchaser: {
        type: String,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true,
    strict: false
})

export default model("ticket", ticketSchema);