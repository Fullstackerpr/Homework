import db from '../db/index.js';

export class ProductController{
    async createProduct(req, res) {
        try {
            const {name, price, stock} = req.body;
            const result = await db.query('INSERT INTO product (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
                [name, price, stock]
            );
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result?.rows
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
    
    async getAllProduct(_, res) {
        try {
            const products = await db.query('SELECT * FROM product');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: products?.rows
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async getByIdProduct(req, res) {
        try {
            const product = await db.query('SELECT * FROM product WHERE id = $1', [req.params.id]);
            if(!product?.rows[0]){
                return res.status(404).json({
                    error: 'Product not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: product?.rows
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await db.query('UPDATE product SET name = $1 WHERE id = $2 RETURNING *', 
                [req.body.name, req.params.id]);
            if(!product?.rows[0]){
                return res.status(400).json({
                    error: 'Error on updating product'
                });            
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: product?.rows
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await db.query('DELETE FROM product WHERE id = $1 RETURNING *', [req.params.id]);

            if (!product?.rows[0]) {
                return res.status(400).json({
                    error: 'Error on deleting product'
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

} 