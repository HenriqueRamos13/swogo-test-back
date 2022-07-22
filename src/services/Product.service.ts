import { Request, Response } from "express";
import { ProductRepository } from "../repositories/Product.repository";
import TEXTS from "../utils/Texts";

class ProductService {
  public async get(req: Request, res: Response): Promise<any> {
    const { tag } = req.query;

    const products = await ProductRepository.findAll(tag as string);

    return products;
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const products = await ProductRepository.findOne(id);

    return products;
  }

  public async post(req: Request, res: Response): Promise<any> {
    const { name, price, description, image, tags } = req.body;

    await ProductRepository.create({
      name,
      price,
      description,
      image,
      tags: tags.split(";").map((e) => e.trim().toLowerCase()),
    });

    return { message: TEXTS.success.PRODUCT_CREATED };
  }
}

export default new ProductService();
