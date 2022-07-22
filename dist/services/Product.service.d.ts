import { Request, Response } from "express";
declare class ProductService {
    get(req: Request, res: Response): Promise<any>;
    getOne(req: Request, res: Response): Promise<any>;
    post(req: Request, res: Response): Promise<any>;
}
declare const _default: ProductService;
export default _default;
