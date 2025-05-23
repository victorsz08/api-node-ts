import { Request, Response } from "express";
import { GetInsightUsecase } from "../../../../../../usecases/insight/get.usecase";
import { GetInsightRoute } from "../get.route.express";
import { getInsightSchema } from "../../../../../../validators/insight.schema";


describe("Get Insight Route", () => {
    test("should return insight successfully", async () => {
        const request = {
            query: {
                userId: "2514521",
                dateIn: "2025-05-01",
                dateOut: "2025-05-20"
            }
        } as unknown as Request;

        const insightData = {
            revenue: 4441.80,
            sales: 40,
            completionRate: 0.88,
            cancelledRate: 0.12,
            connected: 32,
            pending: 5,
            cancelled: 3
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(insightData)
        } as unknown as Response;

        const mockExecute = jest.fn().mockResolvedValue(insightData);
        const mockUsecase = { execute: mockExecute } as unknown as GetInsightUsecase;

        const route = GetInsightRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        const objectExpected = getInsightSchema.parse(request.query);

        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(insightData);
    })
})