"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_route_express_1 = require("../list.route.express");
const note_schema_1 = require("../../../../../../validators/note.schema");
describe("List Note Route", () => {
    test("list notes successfully", async () => {
        const request = {
            query: {
                page: 1,
                limit: 10,
                userId: "123456",
                dateIn: "2025-05-01",
                dateOut: "2025-05-20"
            },
        };
        const dataNoteList = {
            notes: [
                {
                    id: "6463272",
                    content: "content notes",
                    createdAt: "20/05/2025",
                    updatedAt: "20/05/2025",
                },
            ],
            total: 10,
            pages: 3,
            limit: 10
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(dataNoteList)
        };
        const mockExecute = jest.fn().mockResolvedValue(dataNoteList);
        const mockUsecase = { execute: mockExecute };
        const route = list_route_express_1.ListNoteRoute.build(mockUsecase);
        const handler = route.getHandler();
        await handler(request, response);
        const objectedExpected = note_schema_1.listNoteSchema.parse(request.query);
        expect(mockExecute).toHaveBeenCalledWith(objectedExpected);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(dataNoteList);
    });
});
