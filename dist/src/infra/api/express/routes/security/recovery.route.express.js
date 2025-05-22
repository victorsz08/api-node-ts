"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRecoveryRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const access_guard_middleware_1 = require("../../../../../middlewares/access-guard.middleware");
const role_enum_1 = require("../../../../../domain/enum/role.enum");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const user_schema_1 = require("../../../../../validators/user.schema");
class SecurityRecoveryRoute {
    constructor(path, method, securityRecoveryUsecase) {
        this.path = path;
        this.method = method;
        this.securityRecoveryUsecase = securityRecoveryUsecase;
    }
    ;
    static build(securityRecoveryUsecase) {
        return new SecurityRecoveryRoute("/securities/recovery/:id", route_express_1.HttpMethod.POST, securityRecoveryUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const response = await this.securityRecoveryUsecase.execute({ id });
            return res.status(200).json(response);
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
            (0, logger_middleware_1.LoggerMiddleware)(),
            (0, access_guard_middleware_1.AccessGuard)(role_enum_1.RoleEnum.ADMIN),
            (0, validate_data_middleware_1.ValidateData)(user_schema_1.findUserSchema, "params")
        ];
    }
    ;
}
exports.SecurityRecoveryRoute = SecurityRecoveryRoute;
;
