"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class ListOrderRoute {
    constructor(path, method, listOrderUsecase) {
        this.path = path;
        this.method = method;
        this.listOrderUsecase = listOrderUsecase;
    }
    ;
    static build(listOrderUsecase) {
        return new ListOrderRoute("/orders", route_express_1.HttpMethod.GET, listOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const query = req.query;
            const input = order_schemas_1.listOrderSchema.parse(query);
            const response = await this.listOrderUsecase.execute(input);
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
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.listOrderSchema, "query")
        ];
    }
    ;
}
exports.ListOrderRoute = ListOrderRoute;
;
