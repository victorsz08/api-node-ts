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
        expect(response.status).toBe(201);
        expect(response.send).toHaveBeenCalled();
    })

    test("should a be username already exists", async () => {
        const request = {
            body: {
                username: "invalid.username",
                firstName: "invalid",
                lastName: "invalid",
                password: "invalid"
            }
        } as unknown as Request;

        const mockError = {
            statusCode: 409,
            error: "username indisponivel"
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockError)
        } as unknown as Response;

        const objectExpected = createUserSchema.parse(request.body);
        const route = CreateUserRoute.build(mockCreateUserUsecase);

        const handler = route.getHandler()

        await handler(request, response);
        await mockCreateUserUsecase.execute(objectExpected)

        await expect(mockCreateUserUsecase.execute(objectExpected)).rejects.toEqual(
            new HttpException("username indisponivel", HttpStatus.CONFLICT)
        )
        expect(response.status).toBe(409);
        expect(response.json).toBe(mockError)
    })

    test("should a be ")
});