"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_route_express_1 = require("../list.route.express");
describe("List User Route", () => {
    test("list user sucessfully", async () => {
        const request = {
            query: {
                page: 1,
                limit: 10,
                search: "vic"
            }
        };
        const mockListUser = {
            users: [
                {
                    id: "00000",
                    username: "jonh.doe",
                    firstName: "jonh",
                    lastName: "doe",
                    role: "USER",
                    createdAt: "20/05/2025",
                    updatedAt: "20/05/2025"
                }
            ],
            total: 10,
            pages: 1,
            limit: 10
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockListUser)
        };
        const mockExecute = jest.fn().mockResolvedValue(mockListUser);
        const mockUsecase = { execute: mockExecute };
        const route = list_route_express_1.ListUserRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith(request.query);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockListUser);
    });
});
