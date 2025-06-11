"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const order_schemas_1 = require("../../../../../validators/order.schemas");
class CreateOrderRoute {
    constructor(path, method, createOrderUsecase) {
        this.path = path;
        this.method = method;
        this.createOrderUsecase = createOrderUsecase;
    }
    ;
    static build(createOrderUsecase) {
        return new CreateOrderRoute("/orders/:userId", route_express_1.HttpMethod.POST, createOrderUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { userId } = req.params;
            const { number, local, schedulingDate, schedulingTime, price, contact } = req.body;
            const input = order_schemas_1.createOrderSchema.parse({
                number,
                local,
                schedulingDate,
                schedulingTime,
                price,
                contact,
            });
            await this.createOrderUsecase.execute({
                userId,
                number: input.number,
                local: input.local,
                schedulingDate: input.schedulingDate,
                schedulingTime: input.schedulingTime,
                price: input.price,
                contact: input.contact,
            });
            return res.status(201).send();
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
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.createOrderSchema, "body"),
            (0, validate_data_middleware_1.ValidateData)(order_schemas_1.findUserIdSchema, "params")
        ];
    }
    ;
}
exports.CreateOrderRoute = CreateOrderRoute;
;
