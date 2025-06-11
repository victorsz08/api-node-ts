"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_enum_1 = require("../../../../../../domain/enum/status.enum");
const find_route_express_1 = require("../find.route.express");
describe("Find Order Route", () => {
    test("find order successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            }
        };
        const orderData = {
            id: "00000",
            number: "000000",
            local: "São Paulo",
            schedulingDate: new Date(),
            schedulingTime: "12h as 15h",
            status: status_enum_1.StatusEnum.PENDING,
            contact: "11 99999-9999",
            userId: "00000000",
            createdAt: "22/05/2025",
            updatedAt: "22/05/2025"
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(orderData)
        };
        const mockExecute = jest.fn().mockReturnValue(orderData);
        const mockUsecase = { execute: mockExecute };
        const route = find_route_express_1.FindOrderRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(orderData);
    });
});
