"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_route_express_1 = require("../create.route.express");
describe("Create Note Route", () => {
    test("created note successfully", async () => {
        const request = {
            params: {
                userId: "221414"
            },
            body: {
                content: "content notes"
            }
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute };
        const route = create_route_express_1.CreateNoteRoute.build(mockUsecase);
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
