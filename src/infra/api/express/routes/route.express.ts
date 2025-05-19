import { Request, Response, NextFunction } from "express";

export type T = any;
export type HttpMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    PUT: "put" as HttpMethod,
    DELETE: "delete" as HttpMethod,
} as const;

export interface Route {
    getHandler(): (req: Request, res: Response) => Promise<T>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<T>)[]; 
};