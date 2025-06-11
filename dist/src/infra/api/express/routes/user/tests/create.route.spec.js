"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_route_express_1 = require("../create.route.express");
const http_exception_1 = require("../../../../../../package/http-exceptions/http-exception");
const http_status_1 = require("../../../../../../package/http-exceptions/http-status");
const user_schema_1 = require("../../../../../../validators/user.schema");
describe("create user test", () => {
    let mockCreateUserUsecase;
    beforeAll(() => {
        const mockExecute = jest.fn().mockResolvedValue(undefined);
        mockCreateUserUsecase = { execute: mockExecute };
    });
    test("should a new user created successfully", async () => {
        const request = {
            body: {
                username: "test.jest",
                firstName: "test",
                lastName: "jest",
                password: "123456789"
            }
        };
        const route = create_route_express_1.CreateUserRoute.build(mockCreateUserUsecase);
        const handler = route.getHandler();
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        await handler(request, response);
        const userData = user_schema_1.createUserSchema.parse(request.body);
        expect(mockCreateUserUsecase.execute).toHaveBeenCalledWith(userData);
        expect(response.status).toBe(201);
        expect(response.send).toHaveBeenCalled();
    });
    test("should a be username already exists", async () => {
        const request = {
            body: {
                username: "invalid.username",
                firstName: "invalid",
                lastName: "invalid",
                password: "invalid"
            }
        };
        const mockError = {
            statusCode: 409,
            error: "username indisponivel"
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockError)
        };
        const objectExpected = user_schema_1.createUserSchema.parse(request.body);
        const route = create_route_express_1.CreateUserRoute.build(mockCreateUserUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        await mockCreateUserUsecase.execute(objectExpected);
        await expect(mockCreateUserUsecase.execute(objectExpected)).rejects.toEqual(new http_exception_1.HttpException("username indisponivel", http_status_1.HttpStatus.CONFLICT));
        expect(response.status).toBe(409);
        expect(response.json).toBe(mockError);
    });
    test("should a be ");
});
