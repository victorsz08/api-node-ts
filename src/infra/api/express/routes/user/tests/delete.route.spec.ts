import { Request, Response } from "express";
import { DeleteUserUsecase } from "../../../../../../usecases/user/delete.usecase";
import { DeleteUserRoute } from "../delete.route.express";



describe("Delete User Route", () => {
    test("user deleted successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            }
        } as unknown as Request;

        const response = { 
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as DeleteUserUsecase;

        const route = DeleteUserRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled()
    })
})