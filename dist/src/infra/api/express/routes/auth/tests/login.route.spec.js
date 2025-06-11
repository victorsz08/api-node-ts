"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_route_express_1 = require("../login.route.express");
describe("Auth Login Route", () => {
    test("login successfully", async () => {
        const request = {
            body: {
                username: "jonh.doe",
                password: "123456"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            cookie: jest.fn()
        };
        const mockToken = {
            token: "jwt_token"
        };
        const mockExecute = jest.fn().mockResolvedValue(mockToken);
        const mockUsecase = { execute: mockExecute };
        const route = login_route_express_1.AuthLoginRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        expect(mockExecute).toHaveBeenCalledWith(request.body);
        expect(response.cookie).toHaveBeenCalledWith("nt.authtoken", mockToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 60 * 24,
        });
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});
