import { Request, Response } from "express"
import { UpdatePasswordUserUsecase } from "../../../../../../usecases/user/udpate-password.usecase";
import { UpdatePasswordUserRoute } from "../update-password.route.express";


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
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as UpdatePasswordUserUsecase;

        const route = UpdatePasswordUserRoute.build(mockUsecase);
        const handler = route.getHandler();

        const objectExpected = {
            ...request.params,
            ...request.body
        };

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled()
    });
})