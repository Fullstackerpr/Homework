import { connect } from "mongoose";

export const connectDb = async () => {
    try {
        await connect(process.env.DB_URI);
        console.log('DB connected');
    } catch (error) {
        console.log(`Error on connecting to database: ${error}`);
    }
}