import { Request, Response } from "express";
import { DeleteNoteUsecase } from "../../../../../../usecases/note/delete.usecase";
import { DeleteNoteRoute } from "../delete.route.express";


describe("Delete Note Route", () => {
    test("deleted note successfully", async () => {
        const request = {
            params: {
                id: "414251"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as DeleteNoteUsecase;

        const route = DeleteNoteRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        expect(mockExecute).toHaveBeenCalledWith(request.params);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    })
})