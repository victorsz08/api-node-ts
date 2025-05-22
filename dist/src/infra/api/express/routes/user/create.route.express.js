"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const access_guard_middleware_1 = require("../../../../../middlewares/access-guard.middleware");
const role_enum_1 = require("../../../../../domain/enum/role.enum");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const user_schema_1 = require("../../../../../validators/user.schema");
class CreateUserRoute {
    constructor(path, method, createUserUsecase) {
        this.path = path;
        this.method = method;
        this.createUserUsecase = createUserUsecase;
    }
    static build(createUserUsecase) {
        return new CreateUserRoute("/users", route_express_1.HttpMethod.POST, createUserUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const input = req.body;
            await this.createUserUsecase.execute(input);
            return res.status(201).send();
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
            (0, access_guard_middleware_1.AccessGuard)(role_enum_1.RoleEnum.ADMIN),
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.createUserSchema, "body")
        ];
    }
}
exports.CreateUserRoute = CreateUserRoute;
