import { Request, Response } from "express";
export default class ProductController {
    get(req: Request, res: Response): Promise<any>;
    getOne(req: Request, res: Response): Promise<any>;
    post(req: Request, res: Response): Promise<any>;
}
