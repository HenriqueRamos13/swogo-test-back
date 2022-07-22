import mongoose from "mongoose";

export const Schema = mongoose.Schema;

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [String],
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

export default ProductModel;
