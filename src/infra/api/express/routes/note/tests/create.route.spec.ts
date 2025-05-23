import { Request, Response } from "express";
import { CreateNoteUsecase } from "../../../../../../usecases/note/create.usecase";
import { CreateNoteRoute } from "../create.route.express";



describe("Create Note Route", () => {
    test("created note successfully", async () => {
        const request = {
            params: {
                userId: "221414"
            },
            body: {
                content: "content notes"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as CreateNoteUsecase;

        const route = CreateNoteRoute.build(mockUsecase);
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