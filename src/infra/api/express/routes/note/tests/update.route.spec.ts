import { Request, Response } from "express";
import { UpdateNoteUsecase } from "../../../../../../usecases/note/update.usecase";
import { UpdateNoteRoute } from "../update.route.express";

describe("Update Note Route", () => {
    test("updated note successfully", async () => {
        const request = {
            params: {
                id: "1245656"
            },
            body: {
                content: "update content notes"
            }
        } as unknown as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        const mockExecute = jest.fn().mockReturnValue(undefined);
        const mockUsecase = { execute: mockExecute } as unknown as UpdateNoteUsecase;

        const route = UpdateNoteRoute.build(mockUsecase);
        const handler = route.getHandler();

        await handler(request, response);

        const objectExpected = {
            ...request.params,
            ...request.body
        };

        expect(mockExecute).toHaveBeenCalledWith(objectExpected);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.send).toHaveBeenCalled();
    })
})