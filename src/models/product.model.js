import mongoose from "mongoose";
import { category } from "./category.model.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: category,
      require:true
    },
    stock: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const product = mongoose.model("product", productSchema);
