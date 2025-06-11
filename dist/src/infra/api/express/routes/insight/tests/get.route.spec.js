"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_route_express_1 = require("../get.route.express");
const insight_schema_1 = require("../../../../../../validators/insight.schema");
describe("Get Insight Route", () => {
    test("should return insight successfully", async () => {
        const request = {
            query: {
                userId: "2514521",
                dateIn: "2025-05-01",
                dateOut: "2025-05-20"
            }
        };
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
        };
        const mockExecute = jest.fn().mockResolvedValue(insightData);
        const mockUsecase = { execute: mockExecute };
        const route = get_route_express_1.GetInsightRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        const objectExpected = insight_schema_1.getInsightSchema.parse(request.query);
        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(insightData);
    });
});
