"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_route_express_1 = require("../update.route.express");
describe("Update Order Route", () => {
    test("update order successfully", async () => {
        const request = {
            params: {
                id: "11111"
            },
            body: {
                number: 1234,
                local: "New York",
                price: 119.9,
                contact: "11 11111 11111"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockResolvedValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const router = update_route_express_1.UpdateOrderRoute.build(mockUsecase);
        const handler = router.getHandler();
        await handler(request, response);
        const expectObject = {
            ...request.params,
            ...request.body
        };
        expect(mockExecute).toHaveBeenCalledWith(expectObject);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});
