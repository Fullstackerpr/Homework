import express from "express"
import { userController } from "../controllers/index.js"
import { authMiddleware } from "../middlewares/user.middleware.js"
import { authController } from "../controllers/index.js"

const router = express.Router()

router
    .get("/", userController.getall)
    .get("/:id", userController.getone)
    .post("/", authController.register)
    .put("/:id", userController.update)
    .delete("/:id", userController.delete)

export {router as userRouter}