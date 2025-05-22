import { Request, Response } from "express";
import { StatusEnum } from "../../../../../../domain/enum/status.enum";
import { UpdateStatusOrderUsecase } from "../../../../../../usecases/order/update-status.usecase";
import { UpdateStatusOrderRoute } from "../update-status.route.express";


describe("Update Status Order Route", () => {
    test("updated status order successfully", async () => {
        const request = {
            params: {
                id: "1111"
            },
            body: {
                status: StatusEnum.CONNECTED
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as UpdateStatusOrderUsecase;

        const route = UpdateStatusOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        const objectExpected = {
            ...request.params,
            ...request.body
        };

        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled()
    })
})