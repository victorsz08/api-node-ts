import { Request, Response } from "express";
import { ListNoteUsecase } from "../../../../../../usecases/note/list.usecase";
import { ListNoteRoute } from "../list.route.express";

describe("List Note Route", () => {
  test("list notes successfully", async () => {
    const request = {
      query: {
        page: 1,
        limit: 10,
        userId: "123456",
      },
    } as unknown as Request;

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
    } as unknown as Response;

    const mockExecute = jest.fn().mockResolvedValue(dataNoteList);
    const mockUsecase = { execute: mockExecute } as unknown as ListNoteUsecase;

    const route = ListNoteRoute.build(mockUsecase);
    const handler = route.getHandler();

    await handler(request, response);

    expect(mockExecute).toHaveBeenCalledWith(request.query);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(dataNoteList);
  });
});
