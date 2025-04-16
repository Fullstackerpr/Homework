import express from 'express';

import morgan from 'morgan';

import { User } from './models/index.js';

import {
    customMiddleware,
    newMiddleware,
} from './middleware/auth.middleware.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));

app.use('/api/v1', appRouter);


export default app;