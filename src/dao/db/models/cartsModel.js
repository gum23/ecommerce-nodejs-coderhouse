import mongoose, { Schema, model } from 'mongoose';

const cartsSchema = new Schema({
    date: {
        type: String,
        require: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
}, {
    versionKey: false,
    timestamps: true
});

cartsSchema.pre("findOne", function() {
    this.populate("products.product");
})

export default model("carts", cartsSchema);