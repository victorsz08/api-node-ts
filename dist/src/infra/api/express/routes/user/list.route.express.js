"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const user_schema_1 = require("../../../../../validators/user.schema");
class ListUserRoute {
    constructor(path, method, listUserUsecase) {
        this.path = path;
        this.method = method;
        this.listUserUsecase = listUserUsecase;
    }
    static build(listUserUsecase) {
        return new ListUserRoute("/users", route_express_1.HttpMethod.GET, listUserUsecase);
    }
    getHandler() {
        return async (req, res) => {
            const query = req.query;
            const input = user_schema_1.listUserSchema.parse(query);
            const response = await this.listUserUsecase.execute(input);
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
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.listUserSchema, "query")
        ];
    }
}
exports.ListUserRoute = ListUserRoute;
