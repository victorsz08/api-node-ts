import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { DeleteOrderUsecase } from "../../../../../usecases/order/delete.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findOrderSchema } from "../../../../../validators/order.schemas";



export class DeleteOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteOrderUsecase: DeleteOrderUsecase
    ) {};

    public static build(deleteOrderUsecase: DeleteOrderUsecase) {
        return new DeleteOrderRoute("/orders/:id", HttpMethod.DELETE, deleteOrderUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            
            await this.deleteOrderUsecase.execute({ id });
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
            ValidateData(findOrderSchema, "params")
        ];
    };
};