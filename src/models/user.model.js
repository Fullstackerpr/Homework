import {model, Schema} from 'mongoose';



const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const User = model('User', userSchema);
export default User;