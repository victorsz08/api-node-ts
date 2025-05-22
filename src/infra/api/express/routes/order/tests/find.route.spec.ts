import { Request, Response } from "express";
import { StatusEnum } from "../../../../../../domain/enum/status.enum";
import { FindOrderUsecase } from "../../../../../../usecases/order/find.usecase";
import { FindOrderRoute } from "../find.route.express";



describe("Find Order Route", () => {
    test("find order successfully", async () => {
        const request = {
            params: {
                id: "00000000"
            }
        } as unknown as Request;

        const orderData = {
            id: "00000",
            number: "000000",
            local: "São Paulo",
            schedulingDate: new Date(),
            schedulingTime: "12h as 15h",
            status: StatusEnum.PENDING,
            contact: "11 99999-9999",
            userId: "00000000",
            createdAt: "22/05/2025",
            updatedAt: "22/05/2025"
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(orderData)
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(orderData);
        const mockUsecase = { execute: mockExecute } as unknown as FindOrderUsecase;

        const route = FindOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(orderData);
    })
})