"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class UpdateOrderRoute {
    constructor(path, method, updateOrderUsecase) {
        this.path = path;
        this.method = method;
        this.updateOrderUsecase = updateOrderUsecase;
    }
    ;
    static build(updateOrderUsecase) {
        return new UpdateOrderRoute("/orders/:id", route_express_1.HttpMethod.PUT, updateOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const { number, local, price, contact } = req.body;
            await this.updateOrderUsecase.execute({ id, number, local, price, contact });
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
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.findOrderSchema, "params"),
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.updateOrderSchema, "body")
        ];
    }
    ;
}
exports.UpdateOrderRoute = UpdateOrderRoute;
;
