import Product from "../models/product.model.js";
import { catchError } from "../utils/error-response.js";
import { successRes } from "../utils/success-response.js";


export class productController{
    async createProduct(req, res){
        try {
            const body = req.body;

            const isExistsProduct = await Product.findOne({name});
            if(isExistsProduct){
                catchError(res, 409, 'User already exists');
            }
            const newProduct = await Product.create(body);
            if(newProduct){
                catchError(res, 409, 'Product already exists!');
            }
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newProductProduct
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async getAllProduct(_, res){
        try{
            const products = await Product.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: products
            });
        } catch (error){
            catchError(res, 500, error.message);
        }
    }


}