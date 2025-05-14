import db from "../models/index.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const product = await db.Product.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAllProducts(_, res) {
    try {
      const products = await db.Product.findAll({
        include: { all: true },
        attributes: ["id", "name", "price"],
      });
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getByIdProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await db.Product.findByPk(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await db.Productroduct.findByPk(id);
      if (!product) {
        return res.status(404).json({
          message: "product not found",
        });
      }
      const { name } = req.body;

      await product.update({ name });
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await db.Product.findByPk(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      await product.destroy();
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
