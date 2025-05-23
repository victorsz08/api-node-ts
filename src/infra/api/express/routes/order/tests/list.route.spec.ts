import { Request, Response } from "express";
import { StatusEnum } from "../../../../../../domain/enum/status.enum";
import { ListOrderUsecase } from "../../../../../../usecases/order/list.usecase";
import { ListOrderRoute } from "../list.route.express";
import { listOrderSchema } from "../../../../../../validators/order.schemas";



describe("List Orders Route", () => {
    test("list orders successfully", async () => {
        const request = {
            query: {
                page: 1,
                limit: 10,
                userId: "123456",
                createdDateIn: "2025-01-02",
                createdDateOut: "2025-01-02",
                schedulingDateIn: "2025-01-02",
                schedulingDateOut: "2025-01-02",
                status: StatusEnum.CANCELED
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
                createdAt: "22/05/2025",
                updatedAt: "22/05/2025"
            }
        ];

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockOrderData)
        } as unknown as Response;

        const mockExecute = jest.fn().mockResolvedValue(mockOrderData);
        const mockUsecase = { execute: mockExecute } as unknown as ListOrderUsecase;

        const route = ListOrderRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        const objectExpected = listOrderSchema.parse(request.query);

        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockOrderData);

    });
})