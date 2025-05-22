import { Request, Response } from "express";
import test, { describe } from "node:test";
import { OrderEntity } from "../../../../../../domain/entities/order.entity";
import { StatusEnum } from "../../../../../../domain/enum/status.enum";
import { OrderDto } from "../../../../../../patterns/mappers/order.mapper";
import { ListOrderUsecase } from "../../../../../../usecases/order/list.usecase";
import { ListOrderRoute } from "../list.route.express";



describe("Listt Orders Route", () => {
    test("list orders successfully", async () => {
        const request = {
            query: {
                page: 1,
                limit: 10,
                userId: "123456"
            }
        } as unknown as Request;
        
        const mockOrderData = [
                    {
                        id: "00000",
                        number: 1111111111,
                        local: "São Paulo",
                        schedulingDate: "22/05/2025",
                        schedulingTime: "12h as 15h",
                        status: StatusEnum.PENDING,
                        contact: "11 99999-9999",
                        userId: "00000000",
                        createdAt: "22/05/2025",
                        updatedAt: "22/05/2025"
                    }
        ];

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockOrderData)
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(mockOrderData);
        const mockUsecase = { execute: mockExecute } as unknown as ListOrderUsecase;

        const route = ListOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.query);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockOrderData);

    });
})