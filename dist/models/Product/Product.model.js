"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const mongoose_1 = require("mongoose");
exports.Schema = mongoose_1.default.Schema;
const ProductSchema = new exports.Schema({
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
const ProductModel = mongoose_1.default.model("product", ProductSchema);
exports.default = ProductModel;
