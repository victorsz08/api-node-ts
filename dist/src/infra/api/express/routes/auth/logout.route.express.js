"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLogoutRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
class AuthLogoutRoute {
    constructor(path, method) {
        this.path = path;
        this.method = method;
    }
    ;
    static build() {
        return new AuthLogoutRoute("/auth/logout", route_express_1.HttpMethod.POST);
    }
    ;
    getHandler() {
        return async (req, res) => {
            res.clearCookie("nt.authtoken");
            return res.status(204).send();
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
exports.AuthLogoutRoute = AuthLogoutRoute;
;
