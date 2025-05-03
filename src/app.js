import express from 'express';
import { config } from 'dotenv';
import router from './routes/user.routes.js'
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import logger from './utils/logger/logger.js';

config();

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cookieParser());
connectDb();


app.use('/user', router);


process.on('unhandledRejection', (reasion) => {
    console.log(`unhandled rejection: ${reasion}`)
});

app.use((err, res, next) => {
    if (err) {
      return res
        .status(500)
        .json({ error: err.message || 'Internal server error' });
    } else {
      next();
    }
  });
  
  app.listen(PORT, logger.info(`Server running on port ${PORT}`));