"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_route_express_1 = require("../update.route.express");
describe("Update User Route", () => {
    test("updated user successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            },
            body: {
                username: "jonh.doe",
                firstName: "jonh",
                lastName: "doe"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = update_route_express_1.UpdateUserRoute.build(mockUsecase);
        const handler = route.getHandler();
        const objectExpect = {
            ...request.params,
            ...request.body,
        };
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith(objectExpect);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});
