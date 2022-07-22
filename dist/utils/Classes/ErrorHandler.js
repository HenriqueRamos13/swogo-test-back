"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
class ErrorHandler {
    static Unauthorized(error, message, res) {
        process.env.LOG_REAL_ERRORS && console.log(error);
        if (res)
            return res.status(401).json(Object.assign({ message: message }, (process.env.LOG_REAL_ERRORS === "true" && { error: error })));
        throw new Error(message);
    }
}
exports.default = ErrorHandler;
