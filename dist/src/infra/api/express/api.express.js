"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
const http_handler_error_middleware_1 = require("../../../middlewares/http-handler-error.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
class ApiExpress {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: ["POST, GET, PUT, DELETE"],
            credentials: true,
        }));
        this.app.use((0, helmet_1.default)());
        this.app.use(http_handler_error_middleware_1.HttpHandlerError);
        this.app.use((0, cookie_parser_1.default)());
        this.addRoutes(routes);
    }
    ;
    static build(routes) {
        return new ApiExpress(routes);
    }
    ;
    start(port) {
        this.app.listen(port, () => {
            console.log("server http running");
        });
    }
    ;
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const middlewares = route.getMiddlewares?.() || [];
            this.app[method](path, ...middlewares, handler);
        });
    }
    ;
}
exports.ApiExpress = ApiExpress;
;
