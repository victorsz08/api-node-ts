import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";
import { config } from "../../prisma/config";

export function LoggerMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["nt.authtoken"];

        if(!token) {
            return res.status(401).json({ message: "token não localizado" });
        };

        try {
            verify(token, config.secret);
            return next()
        } catch (error) {
            return res.status(401).json({ message: "unauthorized" });
        };
    };
};