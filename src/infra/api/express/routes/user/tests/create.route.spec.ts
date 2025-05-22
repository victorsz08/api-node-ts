import { CreateUserUsecase } from './../../../../../../usecases/user/create.usecase';
import { Request, Response } from "express";
import { CreateUserRoute } from "../create.route.express";

describe("create user test", () => {
    test("Create user successfully", async () => {
        const request = {
            body: {
                username: "test.jest",
                firstName: "test",
                lastName: "jest",
                password: "123456789"
            }
        } as Request;

        const mockExecute = jest.fn().mockResolvedValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as CreateUserUsecase;

        const route = CreateUserRoute.build(mockUsecase);
        const handler = route.getHandler();

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        await handler(request, response);
        

        expect(mockExecute).toHaveBeenCalledWith(request.body);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.send).toHaveBeenCalled();
    })
});