import { Request, Response } from "express";
import { FindNoteUsecase } from "../../../../../../usecases/note/find.usecase";
import { FindNoteRoute } from "../find.route.express";


describe("Find Note Route", () => {
    test("find note successfully", async () => {
        const request = {
            params: {
                id: "5252525"
            }
        } as unknown as Request;

        const dataNote = {
            id: "6463272",
            content: "content notes",
            createdAt: "20/05/2025",
            updatedAt: "20/05/2025"
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnValue(dataNote)
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(dataNote);
        const mockUsecase = { execute: mockExecute } as unknown as FindNoteUsecase;

        const route = FindNoteRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(dataNote);
    });
});