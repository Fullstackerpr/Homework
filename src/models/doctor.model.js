import { model, Schema } from "mongoose";

const doctorSchema = new Schema({
    fullName: { type: String },
    phoneNumber: { type: String, unique: true },
    special: { type: String }
}, { timestamps: true });

const Doctor = model('Doctor', doctorSchema);
export default Doctor;
