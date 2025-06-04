import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { AuthLoginUsecase } from "../../../../../usecases/auth/login.usecase";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { authLoginSchema } from "../../../../../validators/login.schema";




export class AuthLoginRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authLoginUsecase: AuthLoginUsecase
    ) {};

    public static build(authLoginUsecase: AuthLoginUsecase) {
        return new AuthLoginRoute("/auth/login", HttpMethod.POST, authLoginUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { username, password } = req.body;
            const payload = await this.authLoginUsecase.execute({ username, password });

            res.cookie("nt.authtoken", payload.token, {
                httpOnly: true,
                maxAge: 60 * 60 * 60 * 24, // 1 dia
                sameSite: "none",            // ✅ necessário para cross-origin
                secure: true  
            });



            return res.status(204).send();
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
            ValidateData(authLoginSchema, "body")
        ];
    }
};