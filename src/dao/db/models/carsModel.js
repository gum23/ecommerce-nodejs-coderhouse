import { Schema, model } from 'mongoose';

const carsSchema = new Schema({
    products: {
        type: Array,
        require: true,
        id: {
            type: String,
            require: true,
            trim: true
        },
        quantity: {
            type: Number,
            require: true,
            trim: true
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model("cars", carsSchema);