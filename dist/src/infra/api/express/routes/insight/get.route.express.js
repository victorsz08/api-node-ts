"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInsightRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
const validate_data_middleware_1 = require("../../../../../middlewares/validate-data.middleware");
const insight_schema_1 = require("../../../../../validators/insight.schema");
class GetInsightRoute {
    constructor(path, method, getInsightUsecase) {
        this.path = path;
        this.method = method;
        this.getInsightUsecase = getInsightUsecase;
    }
    ;
    static build(getInsightUsecase) {
        return new GetInsightRoute("/insights", route_express_1.HttpMethod.GET, getInsightUsecase);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const query = req.query;
            const input = insight_schema_1.getInsightSchema.parse(query);
            const data = await this.getInsightUsecase.execute(input);
            return res.status(200).json(data);
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
            (0, validate_data_middleware_1.ValidateData)(insight_schema_1.getInsightSchema, "query")
        ];
    }
    ;
}
exports.GetInsightRoute = GetInsightRoute;
;
