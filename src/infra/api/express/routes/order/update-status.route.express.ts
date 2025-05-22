import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { UpdateStatusOrderUsecase } from "../../../../../usecases/order/update-status.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findOrderSchema, updateStatusSchema } from "../../../../../validators/order.schemas";




export class UpdateStatusOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateStatusOrderUsecase: UpdateStatusOrderUsecase
    ) {};

    public static build(updateStatusOrderUsecase: UpdateStatusOrderUsecase) {
        return new UpdateStatusOrderRoute("/orders/status/:id", HttpMethod.PUT, updateStatusOrderUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const { status } = req.body;

            await this.updateStatusOrderUsecase.execute({ id, status });
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
            LoggerMiddleware(),
            ValidateData(updateStatusSchema, "body"),
            ValidateData(findOrderSchema, "params")
        ];
    };
};