import express from 'express';
import { userRouter } from './routes/index.js';
import { errorHandle } from './middlewares/error.handle.js';

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use(errorHandle);


export default app;