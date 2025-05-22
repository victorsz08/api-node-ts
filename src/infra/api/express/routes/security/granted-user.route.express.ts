import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { GrantedUserUsecase } from "../../../../../usecases/security/granted-user.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { AccessGuard } from "../../../../../middlewares/access-guard.middleware";
import { RoleEnum } from "../../../../../domain/enum/role.enum";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findUserIdSchema } from "../../../../../validators/order.schemas";
import { findUserSchema } from "../../../../../validators/user.schema";
import { grantedUserSchema } from "../../../../../validators/granted-user.schema";


export class GrantedUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly grantedUserUsecase: GrantedUserUsecase
    ) {};

    public static build(grantedUserUsecase: GrantedUserUsecase) {
        return new GrantedUserRoute("/securities/granted/:id", HttpMethod.PUT, grantedUserUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const { role } = req.body;

            await this.grantedUserUsecase.execute({ id, role });
            return res.status(204).send();
        } 
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<T>)[] {
        return [
            LoggerMiddleware(),
            AccessGuard(RoleEnum.ADMIN),
            ValidateData(findUserSchema, "params"),
            ValidateData(grantedUserSchema, "body")
        ];
    };
};