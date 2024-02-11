import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
    user: {
        type: String,
        require: true,
        trim: true,
    },
    message: {
        type: String,
        require: true,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});

export default model("messages", ChatSchema);