"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class FindOrderRoute {
    constructor(path, method, findOrderUsecase) {
        this.path = path;
        this.method = method;
        this.findOrderUsecase = findOrderUsecase;
    }
    ;
    static build(findOrderUsecase) {
        return new FindOrderRoute("/orders/:id", route_express_1.HttpMethod.GET, findOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { id } = req.params;
            const response = await this.findOrderUsecase.execute({ id });
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
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.findOrderSchema, "params")
        ];
    }
}
exports.FindOrderRoute = FindOrderRoute;
;
