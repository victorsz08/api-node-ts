"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const user_schema_1 = require("../../../../../validators/user.schema");
class FindUserRoute {
    constructor(path, method, findUserUsecase) {
        this.path = path;
        this.method = method;
        this.findUserUsecase = findUserUsecase;
    }
    static build(findUserUsecase) {
        return new FindUserRoute("/users/:id", route_express_1.HttpMethod.GET, findUserUsecase);
    }
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const response = await this.findUserUsecase.execute({ id });
            return res.status(200).json(response);
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    getMiddlewares() {
        return [
            (0, logger_middleware_1.LoggerMiddleware)(),
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.findUserSchema, "params")
        ];
    }
}
exports.FindUserRoute = FindUserRoute;
