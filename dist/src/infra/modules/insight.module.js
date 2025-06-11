"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insightRoutes = void 0;
const prisma_service_1 = require("../../package/prisma/prisma.service");
const get_usecase_1 = require("../../usecases/insight/get.usecase");
const sales_per_day_usecase_1 = require("../../usecases/insight/sales-per-day.usecase");
const get_sales_per_day_route_express_1 = require("../api/express/routes/insight/get-sales-per-day.route.express");
const get_route_express_1 = require("../api/express/routes/insight/get.route.express");
const insight_repository_1 = require("../repositories/insight.repository");
const insightRepository = insight_repository_1.InsightRepository.build(prisma_service_1.prisma);
const getInsightUsecase = get_usecase_1.GetInsightUsecase.build(insightRepository);
const getSalesPerDayUsecase = sales_per_day_usecase_1.GetSalesPerDayUsecase.build(insightRepository);
const getInsightRoute = get_route_express_1.GetInsightRoute.build(getInsightUsecase);
const getSalesPerDayRoute = get_sales_per_day_route_express_1.GetSalesPerDayRoute.build(getSalesPerDayUsecase);
exports.insightRoutes = [
    getInsightRoute,
    getSalesPerDayRoute,
];
