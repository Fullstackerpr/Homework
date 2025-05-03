import { required, types } from "joi";
import { model, Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        
    }
})