import { CreateUserUsecase } from './../../../../../../usecases/user/create.usecase';
import { Request, Response } from "express";
import { CreateUserRoute } from "../create.route.express";
import { HttpException } from '../../../../../../package/http-exceptions/http-exception';
import { HttpStatus } from '../../../../../../package/http-exceptions/http-status';
import { createUserSchema } from '../../../../../../validators/user.schema';

describe("create user test", () => {
    let mockCreateUserUsecase: CreateUserUsecase;

    beforeAll(() => {
        const mockExecute = jest.fn().mockResolvedValue(undefined)
        mockCreateUserUsecase = { execute: mockExecute } as unknown as CreateUserUsecase;
    })

    test("should a new user created successfully", async () => {
        const request = {
            body: {
                username: "test.jest",
                firstName: "test",
                lastName: "jest",
                password: "123456789"
            }
        } as Request;

        const route = CreateUserRoute.build(mockCreateUserUsecase);
        const handler = route.getHandler();

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        await handler(request, response);
        
        const userData = createUserSchema.parse(request.body)

        expect(mockCreateUserUsecase.execute).toHaveBeenCalledWith(userData);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.send).toHaveBeenCalled();
    });
});