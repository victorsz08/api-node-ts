"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class DeleteOrderRoute {
    constructor(path, method, deleteOrderUsecase) {
        this.path = path;
        this.method = method;
        this.deleteOrderUsecase = deleteOrderUsecase;
    }
    ;
    static build(deleteOrderUsecase) {
        return new DeleteOrderRoute("/orders/:id", route_express_1.HttpMethod.DELETE, deleteOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            await this.deleteOrderUsecase.execute({ id });
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
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.findOrderSchema, "params")
        ];
    }
    ;
}
exports.DeleteOrderRoute = DeleteOrderRoute;
;
