"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../../../../../../../prisma/config");
const session_route_express_1 = require("../session.route.express");
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
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jwt.verify.mockReturnValue(true);
        jwt.decode.mockReturnValue(mockSession);
        const route = session_route_express_1.AuthSessionRoute.build();
        const handler = route.getHandler();
        await handler(request, response);
        expect(jwt.verify).toHaveBeenCalledWith(request.cookies["nt.authtoken"].token, config_1.config.secret);
        expect(jwt.decode).toHaveBeenCalledWith(mockToken);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockSession);
    });
});
