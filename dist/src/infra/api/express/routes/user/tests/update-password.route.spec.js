"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_password_route_express_1 = require("../update-password.route.express");
describe("Update Password Route", () => {
    test("update password successfully", async () => {
        const request = {
            params: {
                id: "0000000"
            },
            body: {
                currentPassword: "123456789",
                newPassword: "9876543210"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = update_password_route_express_1.UpdatePasswordUserRoute.build(mockUsecase);
        const handler = route.getHandler();
        const objectExpected = {
            ...request.params,
            ...request.body
        };
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});
