import { Request, Response } from "express";
import { DeleteOrderUsecase } from "../../../../../../usecases/order/delete.usecase";
import { DeleteOrderRoute } from "../delete.route.express";


describe("Delete Order Route", () => {
    test("deleted order successfully", async () => {
        const request = {
            params: {
                id: "11111"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as DeleteOrderUsecase;

        const route = DeleteOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});