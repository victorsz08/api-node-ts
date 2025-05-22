"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class UpdateStatusOrderRoute {
    constructor(path, method, updateStatusOrderUsecase) {
        this.path = path;
        this.method = method;
        this.updateStatusOrderUsecase = updateStatusOrderUsecase;
    }
    ;
    static build(updateStatusOrderUsecase) {
        return new UpdateStatusOrderRoute("/orders/status/:id", route_express_1.HttpMethod.PUT, updateStatusOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const { status } = req.body;
            await this.updateStatusOrderUsecase.execute({ id, status });
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
            (0, logger_middleware_1.LoggerMiddleware)(),
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.updateStatusSchema, "body"),
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.findOrderSchema, "params")
        ];
    }
    ;
}
exports.UpdateStatusOrderRoute = UpdateStatusOrderRoute;
;
