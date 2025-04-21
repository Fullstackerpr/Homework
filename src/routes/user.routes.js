import express from "express";
import { userController } from "../controller/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get('/user', userController.getall);
router.get('/user/:id', userController.getById);
router.post('/user', authMiddleware, userController.create);
router.put('/user:id', authMiddleware, userController.update);
router.delete('/user:id', authMiddleware, userController.delete);

export {router as userRouter};
