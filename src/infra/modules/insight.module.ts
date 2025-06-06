import { prisma } from "../../package/prisma/prisma.service";
import { GetInsightUsecase } from "../../usecases/insight/get.usecase";
import { GetSalesPerDayUsecase } from "../../usecases/insight/sales-per-day.usecase";
import { GetSalesPerDayRoute } from "../api/express/routes/insight/get-sales-per-day.route.express";
import { GetInsightRoute } from "../api/express/routes/insight/get.route.express";
import { InsightRepository } from "../repositories/insight.repository";




const insightRepository = InsightRepository.build(prisma);

const getInsightUsecase = GetInsightUsecase.build(insightRepository);
const getSalesPerDayUsecase = GetSalesPerDayUsecase.build(insightRepository);

const getInsightRoute = GetInsightRoute.build(getInsightUsecase);
const getSalesPerDayRoute = GetSalesPerDayRoute.build(getSalesPerDayUsecase);

export const insightRoutes = [
    getInsightRoute,
    getSalesPerDayRoute,
];