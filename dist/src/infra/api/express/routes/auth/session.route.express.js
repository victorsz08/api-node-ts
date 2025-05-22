"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSessionRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../../../../prisma/config");
class AuthSessionRoute {
    constructor(path, method) {
        this.path = path;
        this.method = method;
    }
    ;
    static build() {
        return new AuthSessionRoute("/auth/session", route_express_1.HttpMethod.GET);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const token = req.cookies["nt.authtoken"]?.token;
            (0, jsonwebtoken_1.verify)(token, config_1.config.secret);
            const session = (0, jsonwebtoken_1.decode)(token);
            return res.status(200).json(session);
        };
    }
    ;
    getPath() {
        return this.path;
    }
    ;
    getMethod() {
        return this.method;
    }
    ;
    getMiddlewares() {
        return [
            (0, logger_middleware_1.LoggerMiddleware)()
        ];
    }
    ;
}
exports.AuthSessionRoute = AuthSessionRoute;
;
