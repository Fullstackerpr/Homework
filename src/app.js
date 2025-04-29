import express from 'express';
import { config } from 'dotenv';
import {connectDb} from './db/index.js'
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import userRouter from './routes/user.routes.js'

config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));

const __dirname = path.resolve();
const filePath = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

if (process.env.NODE_ENV === 'PRODUCTION'){
    app.use(morgan('combined', {stream: filePath}));
} else {
    app.use(morgan('dev'));
}

const PORT = +process.env.PORT;
await connectDb();

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('Server running on', PORT);
})
