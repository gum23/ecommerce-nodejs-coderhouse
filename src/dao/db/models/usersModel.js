import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    rol: {
        type: String,
        default: "usuario"
    },
    documents: {
        type: [
            {
                name: {
                    type: String
                },
                reference: {
                    type: String
                }
            }
        ]
    },
    last_connection: {
        login: {
            type: String
        },
        logout: {
            type: String
        }
    }
},{
    versionKey: false,
    timestamps: true,
    strict: false
});

export default model("users", userSchema);