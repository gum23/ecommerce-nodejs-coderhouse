import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    code: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
        trim: true
    },
    status: {
        type: Boolean,
        require: true, 
        trim: true
    },
    stock: {
        type: Number,
        require: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        trim: true
    },
    thumbnails: {
        type: Object,
        require: true,
        trim: true
    },
    owner: {
        type: String
    },
    cart: {
        type: String
    }
},{
    versionKey: false,
    timestamps: true
})

productSchema.plugin(paginate);

export default model("products", productSchema);