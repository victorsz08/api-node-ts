import { prisma } from "../../package/prisma/prisma.service";
import { GetInsightUsecase } from "../../usecases/insight/get.usecase";
import { GetInsightRoute } from "../api/express/routes/insight/get.route.express";
import { InsightRepository } from "../repositories/insight.repository";




const insightRepository = InsightRepository.build(prisma);

const getInsightUsecase = GetInsightUsecase.build(insightRepository);

const getInsightRoute = GetInsightRoute.build(getInsightUsecase);

export const insightRoutes = [
    getInsightRoute
];