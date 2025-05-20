import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { FindUserUsecase } from "../../../../../usecases/user/find.usecase";
import { UserDto } from "../../../../../patterns/mappers/user.mapper";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { decode, verify } from "jsonwebtoken";



export interface RequestHandler extends Request {
    user: Partial<UserDto>;
}

export class AuthSessionRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod
    ) {};
    
    public static build() {
        return new AuthSessionRoute("/auth/session", HttpMethod.GET);
    };

    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const token = req.cookies["nt.authtoken"];
            
            verify(token, process.env.JWT_SECRET!);
            const user = decode(token);

            return res.status(200).json(user);
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<T>)[] {
        return [
            LoggerMiddleware()
        ]  
    };
}; 