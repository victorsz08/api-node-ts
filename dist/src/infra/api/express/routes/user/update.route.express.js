"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const user_schema_1 = require("../../../../../validators/user.schema");
class UpdateUserRoute {
    constructor(path, method, updateUserUsecase) {
        this.path = path;
        this.method = method;
        this.updateUserUsecase = updateUserUsecase;
    }
    static build(updateUserUsecase) {
        return new UpdateUserRoute("/users/:id", route_express_1.HttpMethod.PUT, updateUserUsecase);
    }
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const { username, firstName, lastName } = req.body;
            await this.updateUserUsecase.execute({
                id,
                username,
                firstName,
                lastName,
            });
            res.status(204).send();
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
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.findUserSchema, "params"),
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.updateUserSchema, "body")
        ];
    }
}
exports.UpdateUserRoute = UpdateUserRoute;
