"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const Product_model_1 = require("../models/Product/Product.model");
const Texts_1 = require("../utils/Texts");
class ProductMongoRepository {
    constructor() {
        this.model = Product_model_1.default;
    }
    async create(data) {
        const product = await this.model.create(Object.assign({}, data));
        if (!(product === null || product === void 0 ? void 0 : product._id))
            throw {
                status: 400,
                message: Texts_1.default.error.PRODUCT_NOT_CREATED,
            };
        return product;
    }
    async findOne(id) {
        const product = await this.model.findById(id);
        if (!product._id)
            throw new Error("Product not found");
        return product;
    }
    async findAll(tag) {
        const products = await this.model.find(Object.assign({}, (tag && { tags: { $in: [tag] } })));
        return products;
    }
}
exports.ProductRepository = new ProductMongoRepository();
