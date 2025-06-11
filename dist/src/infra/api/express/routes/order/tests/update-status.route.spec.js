"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_enum_1 = require("../../../../../../domain/enum/status.enum");
const update_status_route_express_1 = require("../update-status.route.express");
describe("Update Status Order Route", () => {
    test("updated status order successfully", async () => {
        const request = {
            params: {
                id: "1111"
            },
            body: {
                status: status_enum_1.StatusEnum.CONNECTED
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = update_status_route_express_1.UpdateStatusOrderRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        const objectExpected = {
            ...request.params,
            ...request.body
        };
        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    });
});
