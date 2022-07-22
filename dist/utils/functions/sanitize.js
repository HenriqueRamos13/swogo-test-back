"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sanitize = void 0;
const xss = require("xss");
const ErrorHandler_1 = require("../Classes/ErrorHandler");
function isValidType(type) {
    return ["function", "symbol", "boolean", "undefined"].indexOf(type) !== -1;
}
const Sanitize = (object) => {
    try {
        if (isValidType(typeof object))
            return;
        Object.keys(object).forEach(function (key) {
            if (object[key] && typeof object[key] === "object") {
                return (0, exports.Sanitize)(object[key]);
            }
            if (typeof object[key] === "string") {
                object[key] = xss.filterXSS(object[key], {});
            }
        });
        return object;
    }
    catch (error) {
        return ErrorHandler_1.default.Unauthorized(error, "Campos inválidos");
    }
};
exports.Sanitize = Sanitize;
