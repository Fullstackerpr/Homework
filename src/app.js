import express from 'express';
import { config } from 'dotenv';
import {connectDb} from './db/index.js'
import userRouter from './routes/user.routes.js'

config();

const app = express();
app.use(express.json());

const PORT = +process.env.PORT;
await connectDb();

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('Server running on', PORT);
})
