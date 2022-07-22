"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_service_1 = require("../services/Product.service");
const Route_decorator_1 = require("../utils/decorators/Route.decorator");
const methods_enum_1 = require("../utils/enums/methods.enum");
class ProductController {
    async get(req, res) {
        return await Product_service_1.default.get(req, res);
    }
    async getOne(req, res) {
        return await Product_service_1.default.getOne(req, res);
    }
    async post(req, res) {
        return await Product_service_1.default.post(req, res);
    }
}
__decorate([
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.GET,
        path: "/product",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.GET,
        path: "/product/:id",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOne", null);
__decorate([
    (0, Route_decorator_1.routeConfig)({
        method: methods_enum_1.default.POST,
        path: "/product",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "post", null);
exports.default = ProductController;
