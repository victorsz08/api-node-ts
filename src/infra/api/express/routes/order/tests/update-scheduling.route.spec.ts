import { Request, Response } from "express";
import { UpdateSchedulingOrderUsecase } from "../../../../../../usecases/order/update-scheduling.usecase";
import { UpdateSchedulingOrderRoute } from "../update-scheduling.route.express";



describe("Update Scheduling Order Route", () => {
    test("updated schduling order successfully", async () => {
        const request = {
            params: {
                id: "1111"
            },
            body: {
                schedulingDate: new Date(),
                schedulingTime: "08h as 12h"
            }
        } as unknown as Request;
        
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as UpdateSchedulingOrderUsecase;

        const route = UpdateSchedulingOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        const objectExpect = {
            ...request.params,
            ...request.body
        };

        expect(mockExecute).toHaveBeenCalledWith(objectExpect);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});