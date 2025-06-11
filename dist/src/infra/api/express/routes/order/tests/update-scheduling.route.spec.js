"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_scheduling_route_express_1 = require("../update-scheduling.route.express");
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
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = update_scheduling_route_express_1.UpdateSchedulingOrderRoute.build(mockUsecase);
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
