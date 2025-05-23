import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../../../../../../../prisma/config";
import { AuthSessionRoute } from "../session.route.express";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  decode: jest.fn(),
}));

describe("Auth Session Route", () => {
  test("should return session payload from valid token", async () => {
    const mockSession = {
      id: "user-id-123",
      role: "admin",
      iat: 1680000000,
      exp: 1683600000,
    };

    const mockToken = "mock.jwt.token";

    const request = {
      cookies: {
        "nt.authtoken": {
          token: mockToken,
        },
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (jwt.verify as jest.Mock).mockReturnValue(true);
    (jwt.decode as jest.Mock).mockReturnValue(mockSession);

    const route = AuthSessionRoute.build();
    const handler = route.getHandler();

    await handler(request, response);

    expect(jwt.verify).toHaveBeenCalledWith(
      request.cookies["nt.authtoken"].token,
      config.secret
    );
    expect(jwt.decode).toHaveBeenCalledWith(mockToken);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(mockSession);
  });
});
