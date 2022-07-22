"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const hpp = require("hpp");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
const sanitize_1 = require("../utils/functions/sanitize");
const express_rate_limit_1 = require("express-rate-limit");
const Mongo_1 = require("./db/Mongo");
const Texts_1 = require("../utils/Texts");
require("dotenv/config");
const Route_decorator_1 = require("../utils/decorators/Route.decorator");
const Product_controller_1 = require("../controllers/Product.controller");
const Recommendation_controller_1 = require("../controllers/Recommendation.controller");
class App {
    constructor() {
        this.app = express();
        this.corsWhitelist = [
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "https://swogo-animals.surge.sh",
        ];
        console.log("Starting server...");
        this.config();
        this.connectDatabases();
        this.securityConfig();
        this.configureCustomMiddlewares();
        this.configRoutes();
    }
    connectDatabases() {
        console.log("Connecting to databases...");
        new Mongo_1.default();
    }
    configRoutes() {
        console.log("Configuring routes...");
        new Product_controller_1.default();
        new Recommendation_controller_1.default();
        this.app.use(Route_decorator_1.route);
    }
    configureCors() {
        console.log("Configuring CORS...");
        this.app.use(cors({
            origin: this.corsWhitelist,
            credentials: true,
            allowedHeaders: "Content-Type, Accept, Origin, Timestamp",
            preflightContinue: false,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        }));
    }
    async config() {
        console.log("Configuring server...");
        this.configureCors();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(cookieParser());
        this.app.use((0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            message: Texts_1.default.warning.TO_MUCH_REQUESTS,
        }));
    }
    securityConfig() {
        console.log("Configuring security...");
        this.app.use((0, helmet_1.default)());
        this.app.use(hpp());
    }
    start() {
        this.app.listen(process.env.PORT || 3333, () => console.log("Server started!"));
    }
    configureCustomMiddlewares() {
        console.log("Configuring middlewares...");
        this.app.use((req, res, next) => {
            Promise.all([
                (0, sanitize_1.Sanitize)(req.body),
                (0, sanitize_1.Sanitize)(req.params),
                (0, sanitize_1.Sanitize)(req.query),
                (0, sanitize_1.Sanitize)(req.headers),
            ]).then(([body, params, query, headers]) => {
                req.body = body;
                req.params = params;
                req.query = query;
                req.headers = headers;
                next();
            });
        });
    }
}
const app = new App();
exports.default = app;
