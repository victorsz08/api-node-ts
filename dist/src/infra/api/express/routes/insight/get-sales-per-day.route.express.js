"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSalesPerDayRoute = void 0;
const route_express_1 = require("../route.express");
const insight_schema_1 = require("../../../../../validators/insight.schema");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
class GetSalesPerDayRoute {
    constructor(path, method, getSalesPerDayUsecase) {
        this.path = path;
        this.method = method;
        this.getSalesPerDayUsecase = getSalesPerDayUsecase;
    }
    ;
    static build(getSalesPerDayUsecase) {
        return new GetSalesPerDayRoute("/insights/sales-per-day", route_express_1.HttpMethod.GET, getSalesPerDayUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const { userId, dateIn, dateOut } = req.query;
            const input = insight_schema_1.getInsightSchema.parse({ userId, dateIn, dateOut });
            const response = await this.getSalesPerDayUsecase.execute(input);
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
            (0, logger_middleware_1.LoggerMiddleware)()
        ];
    }
    ;
}
exports.GetSalesPerDayRoute = GetSalesPerDayRoute;
;
