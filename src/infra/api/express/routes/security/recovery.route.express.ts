import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { SecuityRecoveryUsecase } from "../../../../../usecases/security/recovery.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { AccessGuard } from "../../../../../middlewares/access-guard.middleware";
import { RoleEnum } from "../../../../../domain/enum/role.enum";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findUserSchema } from "../../../../../validators/user.schema";





export class SecurityRecoveryRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly securityRecoveryUsecase: SecuityRecoveryUsecase
    ) {};

    public static build(securityRecoveryUsecase: SecuityRecoveryUsecase) {
        return new SecurityRecoveryRoute("/securities/recovery/:id", HttpMethod.POST, securityRecoveryUsecase);
    };

    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) =>  {
            const { id } = req.params;

            const response = await this.securityRecoveryUsecase.execute({ id });
            return res.status(200).json(response);
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
            LoggerMiddleware(),
            AccessGuard(RoleEnum.ADMIN),
            ValidateData(findUserSchema, "params")
        ];
    };
};