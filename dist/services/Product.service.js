"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_repository_1 = require("../repositories/Product.repository");
const Texts_1 = require("../utils/Texts");
class ProductService {
    async get(req, res) {
        const { tag } = req.query;
        const products = await Product_repository_1.ProductRepository.findAll(tag);
        return products;
    }
    async getOne(req, res) {
        const { id } = req.params;
        const products = await Product_repository_1.ProductRepository.findOne(id);
        return products;
    }
    async post(req, res) {
        const { name, price, description, image, tags } = req.body;
        await Product_repository_1.ProductRepository.create({
            name,
            price,
            description,
            image,
            tags: tags.split(";").map((e) => e.trim().toLowerCase()),
        });
        return { message: Texts_1.default.success.PRODUCT_CREATED };
    }
}
exports.default = new ProductService();
