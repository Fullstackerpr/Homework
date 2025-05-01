import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import adminRouter from './routes/admin.routes.js';
import cookieParser from 'cookie-parser';
config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDB();

app.use('/admin', adminRouter);

process.on('uncaughtException', (err) => {
    if (err) console.log(`Uncaught exception: ${err}`);
    process.exit(1);
});

process.on('unhandledRejection', (reasion, promise) => {
    console.log(`Unhandled rejection: ${reasion}`);
});

app.listen(PORT, () => console.log('Server running on port', PORT));
