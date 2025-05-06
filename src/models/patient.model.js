import { required } from "joi";
import { model, Schema } from "mongoose";


const patientSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: true,
        required: true
    },
    address: {
        type: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    }
}, {
    timestamps: true
});

const Patient = model('Patient', patientSchema);
export default Patient;