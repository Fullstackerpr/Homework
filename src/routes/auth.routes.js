import { Router } from "express";
import {validateBody} from '../middleware/auth.middleware.js';
import { authSchema } from "../validation/auth.validation.js";
import { authController } from "../controllers/auth.controller.js";


export const authRouter = Router();

authRouter
    .post('/singup', validateBody(authSchema.singUP), authController.signIn.singUP)
    .post('/singin', validateBody(authSchema.signIn), authController.signIn)
    // .get('/profile', validateBody(authSchema.profile), authController.signIn.profile);