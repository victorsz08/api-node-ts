"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_route_express_1 = require("../find.route.express");
describe("Find User Route", () => {
    test("user find successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            }
        };
        const mockUser = {
            id: "0000000",
            username: "Jonh.test",
            firstName: "John",
            lastName: "test",
            role: "USER",
            createdAt: "20/05/2025",
            updatedAt: "20/05/2025"
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockUser)
        };
        const mockExecute = jest.fn().mockResolvedValue(mockUser);
        const mockUsecase = { execute: mockExecute };
        const route = find_route_express_1.FindUserRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith({ id: "00000000" });
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockUser);
    });
});
