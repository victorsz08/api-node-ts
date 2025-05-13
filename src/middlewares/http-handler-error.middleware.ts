import { Response, Request, NextFunction } from "express";
import { HttpException } from "../package/http-exceptions/http-exception";


type T = any;

export function HttpHandlerError(
    error: Error & Partial<HttpException>,
    req: Request, 
    res: Response, 
    next: NextFunction): T
{
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal server error";

    return res.status(statusCode).send({ status: statusCode, error: message });
};