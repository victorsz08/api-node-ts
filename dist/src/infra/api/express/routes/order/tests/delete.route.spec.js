"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_route_express_1 = require("../delete.route.express");
describe("Delete Order Route", () => {
    test("deleted order successfully", async () => {
        const request = {
            params: {
                id: "11111"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = delete_route_express_1.DeleteOrderRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});
