import mongoose from "mongoose";
export declare const Schema: typeof mongoose.Schema;
export interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    tags: string[];
}
declare const ProductModel: mongoose.Model<any, {}, {}, {}>;
export default ProductModel;
