import mongoose from "mongoose";
import { config } from "../config/user.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.db.url);
        console.log('Database connected!!');
    } catch (error) {
        console.log('DB connection faild!', error);
        process.exit(1);
    }
}