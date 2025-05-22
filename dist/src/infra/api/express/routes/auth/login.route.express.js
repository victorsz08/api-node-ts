"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginRoute = void 0;
const route_express_1 = require("../route.express");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const login_schema_1 = require("../../../../../validators/login.schema");
class AuthLoginRoute {
    constructor(path, method, authLoginUsecase) {
        this.path = path;
        this.method = method;
        this.authLoginUsecase = authLoginUsecase;
    }
    ;
    static build(authLoginUsecase) {
        return new AuthLoginRoute("/auth/login", route_express_1.HttpMethod.POST, authLoginUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { username, password } = req.body;
            const payload = await this.authLoginUsecase.execute({ username, password });
            res.cookie("nt.authtoken", payload, {
                httpOnly: true,
                maxAge: 60 * 60 * 60 * 24 // 1 dia
            });
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
            (0, validate_data_middleware_1.ValidateData)(login_schema_1.authLoginSchema, "body")
        ];
    }
}
exports.AuthLoginRoute = AuthLoginRoute;
;
