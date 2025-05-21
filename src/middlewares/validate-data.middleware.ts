import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { HttpStatus } from "../package/http-exceptions/http-status";


export type T = any;


export function ValidateData(schema: z.ZodObject<T, T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                
                return res.status(HttpStatus.BAD_REQUEST).json({ error: 'invalid data', details: errorMessages });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}