import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";
import { config } from "../../prisma/config";

export function LoggerMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["nt.authtoken"]?.token;

        if(!token) {
            return res.status(401).json({ message: "token não localizado" });
        };

        try {
            const decoded = verify(token, config.secret);
            
            console.log(token)
            next()
        } catch (error) {
            return res.status(401).json({ message: "unauthorized" });
        };
    };
};