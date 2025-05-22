import { Request, Response } from "express";
import { FindUserUsecase } from "../../../../../../usecases/user/find.usecase";
import { FindUserRoute } from "../find.route.express";



describe("Find User Route", () => {
    test("user find successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            }
        } as unknown as Request;

        const mockUser = {
            id: "0000000",
            username: "Jonh.test",
            firstName: "John",
            lastName: "test",
            role: "USER",
            createdAt: "20/05/2025",
            updatedAt: "20/05/2025"
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockUser)
        } as unknown as Response;

        const mockExecute = jest.fn().mockResolvedValue(mockUser);
        const mockUsecase = { execute: mockExecute } as unknown as FindUserUsecase;

        const route = FindUserRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith({ id: "00000000" });
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockUser);
    })
})