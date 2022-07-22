import { Request, Response } from "express";
import ProductService from "../services/Product.service";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";

export default class ProductController {
  @routeConfig({
    method: METHOD.GET,
    path: "/product",
  })
  public async get(req: Request, res: Response): Promise<any> {
    return await ProductService.get(req, res);
  }

  @routeConfig({
    method: METHOD.GET,
    path: "/product/:id",
  })
  public async getOne(req: Request, res: Response): Promise<any> {
    return await ProductService.getOne(req, res);
  }

  @routeConfig({
    method: METHOD.POST,
    path: "/product",
  })
  public async post(req: Request, res: Response): Promise<any> {
    return await ProductService.post(req, res);
  }
}
