import { Request, Response } from "express";
import { AuthLoginUsecase } from "../../../../../../usecases/auth/login.usecase";
import { AuthLoginRoute } from "../login.route.express";



describe("Auth Login Route", () => {
    test("login successfully", async () => {
        const request = {
            body: {
                username: "jonh.doe",
                password: "123456"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            cookie: jest.fn()
        } as unknown as Response;

        const mockToken = {
            token: "jwt_token"
        };

        const mockExecute = jest.fn().mockResolvedValue(mockToken);
        const mockUsecase = { execute: mockExecute } as unknown as AuthLoginUsecase;

        const route = AuthLoginRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.body);
        expect(response.cookie).toHaveBeenCalledWith("nt.authtoken", mockToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 60 * 24,
        });
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    })
})