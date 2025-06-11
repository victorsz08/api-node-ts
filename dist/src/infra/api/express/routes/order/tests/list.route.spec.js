"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_enum_1 = require("../../../../../../domain/enum/status.enum");
const list_route_express_1 = require("../list.route.express");
const order_schemas_1 = require("../../../../../../validators/order.schemas");
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
                status: status_enum_1.StatusEnum.CANCELED
            }
        };
        const mockOrderData = [
            {
                id: "00000",
                number: 1111111111,
                local: "São Paulo",
                schedulingDate: "22/05/2025",
                schedulingTime: "12h as 15h",
                status: status_enum_1.StatusEnum.PENDING,
                contact: "11 99999-9999",
                createdAt: "22/05/2025",
                updatedAt: "22/05/2025"
            }
        ];
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(mockOrderData)
        };
        const mockExecute = jest.fn().mockResolvedValue(mockOrderData);
        const mockUsecase = { execute: mockExecute };
        const route = list_route_express_1.ListOrderRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        const objectExpected = order_schemas_1.listOrderSchema.parse(request.query);
        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockOrderData);
    });
});
