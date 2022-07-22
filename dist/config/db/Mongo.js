"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv/config");
class Mongo {
    constructor() {
        this.connect();
    }
    async connect() {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Mongo connected");
    }
}
exports.default = Mongo;
