"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_route_express_1 = require("../update.route.express");
describe("Update Note Route", () => {
    test("updated note successfully", async () => {
        const request = {
            params: {
                id: "1245656"
            },
            body: {
                content: "update content notes"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = update_route_express_1.UpdateNoteRoute.build(mockUsecase);
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
