"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordUserRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const user_schema_1 = require("../../../../../validators/user.schema");
class UpdatePasswordUserRoute {
    constructor(path, method, updatePasswordUserUsecase) {
        this.path = path;
        this.method = method;
        this.updatePasswordUserUsecase = updatePasswordUserUsecase;
    }
    static build(updatePasswordUserUsecase) {
        return new UpdatePasswordUserRoute("/users/password/:id", route_express_1.HttpMethod.PUT, updatePasswordUserUsecase);
    }
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const { currentPassword, newPassword } = req.body;
            await this.updatePasswordUserUsecase.execute({
                id,
                currentPassword,
                newPassword,
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
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.updatePasswordSchema, "body")
        ];
    }
}
exports.UpdatePasswordUserRoute = UpdatePasswordUserRoute;
