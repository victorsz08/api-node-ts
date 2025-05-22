import { Request, Response } from "express";
import { UpdateUserUsecase } from "../../../../../../usecases/user/update.usecase";
import { UpdateUserRoute } from "../update.route.express";



describe("Update User Route", () => {
    test("updated user successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            },
            body: {
                username: "jonh.doe",
                firstName: "jonh",
                lastName: "doe"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as UpdateUserUsecase;
        
        const route = UpdateUserRoute.build(mockUsecase);
        const handler = route.getHandler();
        
        const objectExpect = {
            ...request.params,
            ...request.body,
        };

        await handler(request, response);


        expect(mockExecute).toHaveBeenCalledWith(objectExpect);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled()
    })
})