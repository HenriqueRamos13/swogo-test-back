/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { IProduct } from "../models/Product/Product.model";
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
declare class ProductMongoRepository {
    model: import("mongoose").Model<any, {}, {}, {}>;
    create(data: ICreateProduct): Promise<IProduct>;
    findOne(id: string): Promise<IProduct>;
    findAll(tag?: string): Promise<IProduct[]>;
}
export declare const ProductRepository: ProductMongoRepository;
export {};
