import ProductModel, { IProduct } from "../models/Product/Product.model";
import TEXTS from "../utils/Texts";

export interface ICreateProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
}

export interface IFindProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
}

class ProductMongoRepository {
  model = ProductModel;

  public async create(data: ICreateProduct): Promise<IProduct> {
    const product = await this.model.create({
      ...data,
    });

    if (!product?._id)
      throw {
        status: 400,
        message: TEXTS.error.PRODUCT_NOT_CREATED,
      };

    return product;
  }

  public async findOne(id: string): Promise<IProduct> {
    const product = await this.model.findById(id);

    if (!product._id) throw new Error("Product not found");

    return product;
  }

  public async findAll(tag?: string): Promise<IProduct[]> {
    const products = await this.model.find({
      ...(tag && { tags: { $in: [tag] } }),
    });

    return products;
  }
}

export const ProductRepository = new ProductMongoRepository();
