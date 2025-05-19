import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";



export class UpdateOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly 
    ) {};
    
    getHandler(): (req: Request, res: Response) => Promise<T> {
        throw new Error("Method not implemented.");
    }
    getPath(): string {
        throw new Error("Method not implemented.");
    }
    getMethod(): HttpMethod {
        throw new Error("Method not implemented.");
    }
    getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<T>)[] {
        throw new Error("Method not implemented.");
    }
};