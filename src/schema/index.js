import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    name: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);
