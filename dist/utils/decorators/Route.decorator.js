"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeConfig = exports.route = void 0;
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.route = route;
function routeConfig({ method, path }) {
    return function (target, propertyKey, descriptor) {
        const response = async (req, res) => {
            var _a, _b;
            try {
                const original = await descriptor.value(req, res);
                res.status(200).json(original);
            }
            catch (error) {
                res.status((_a = error.status) !== null && _a !== void 0 ? _a : 500).json({
                    message: (_b = error.message) !== null && _b !== void 0 ? _b : "Internal server error",
                });
            }
        };
        route[method](path, response);
    };
}
exports.routeConfig = routeConfig;
