import express from "express";
import { userController } from "../controller/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();


router.post('/', authMiddleware, userController.create);

export {router as userRouter};
