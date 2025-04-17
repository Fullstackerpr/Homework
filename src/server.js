import dotenv from 'dotenv';
import app from './app.js';
import { config } from './config/user.config.js';
import { connectDB } from './db/db.js';

dotenv.config();

const PORT = config.port || 4000;

const start = () => {
    try {
        connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.log('Something went wrong', error);
        process.exit(1);
    }
}


start();
