import { model, Schema } from 'mongoose';

const doctorSchema = new Schema(
  {
    fullName: { type: String },
    phoneNumber: { type: String, unique: true },
    special: { type: String },
    graphs: [{ type: Schema.Types.ObjectId, ref: 'Graph' }],
  },
  { timestamps: true }
);

const Doctor = model('Doctor', doctorSchema);
export default Doctor;
