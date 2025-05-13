import { Request, Response, NextFunction } from "express";




export function LoggerMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["nt.authtoken"];

        try {
            next()
        } catch (error) {
            res.status(401).json({ message: "unauthorized" });
        };
    };
};