import { Request, Response } from "express";
import { CreateOrderUsecase } from "../../../../../../usecases/order/create.usecase";
import { CreateOrderRoute } from "../create.route.express";

describe("Create order route", () => {
    test("create order successfully", async () => {
        const request = {
            params: {
                userId: "00000"
            },
            body: {
                number: 123456789,
                local: "São Paulo/SP",
                schedulingDate: new Date(),
                schedulingTime: "12h as 15h",
                price: 99.9,
                contact: "119999-9999"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;


        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as CreateOrderUsecase;

        const route = CreateOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        const objectExpect = {
            ...request.params,
            ...request.body
        };

        expect(mockExecute).toHaveBeenCalledWith(objectExpect);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.send).toHaveBeenCalled();
    });
});