import db from "../models/index.js";

export class CategoryController {
    async createCategory(req, res) {
        try {
            const category = await db.Category.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: category
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async getAllCategories(_, res) {
        try {
            const categories = await db.Category.findAll({ include: {all: true} });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: categories
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async getByIdCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await db.Category.findByPk(id);
            if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: category
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async updateCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await db.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }
            const {name} = req.body;

            await category.update({name});
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: category
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async deleteCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await db.Category.findByPk(id);
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }
            await category.destroy();
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