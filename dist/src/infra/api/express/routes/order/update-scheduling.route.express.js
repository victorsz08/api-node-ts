"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchedulingOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class UpdateSchedulingOrderRoute {
    constructor(path, method, updateSchedulingOrderUsecase) {
        this.path = path;
        this.method = method;
        this.updateSchedulingOrderUsecase = updateSchedulingOrderUsecase;
    }
    ;
    static build(updateSchedulingOrderUsecase) {
        return new UpdateSchedulingOrderRoute("/orders/scheduling/:id", route_express_1.HttpMethod.PUT, updateSchedulingOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const { schedulingDate, schedulingTime } = req.body;
            await this.updateSchedulingOrderUsecase.execute({ id, schedulingDate, schedulingTime });
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
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.updateSchedulingSchema, "body")
        ];
    }
    ;
}
exports.UpdateSchedulingOrderRoute = UpdateSchedulingOrderRoute;
;
