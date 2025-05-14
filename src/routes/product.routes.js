import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();
const controller = new ProductController();

router
    .post('/', controller.createProduct)
    .get('/', controller.getAllProducts)
    .get('/:id', controller.getByIdProduct)
    .put('/:id', controller.updateProduct)
    .delete('/:id', controller.deleteProduct)

export default router;