import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { UpdateOrderUsecase } from "../../../../../usecases/order/update.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";



export class UpdateOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateOrderUsecase: UpdateOrderUsecase
    ) {};
    
    public static build(updateOrderUsecase: UpdateOrderUsecase) {
        return new UpdateOrderRoute("/orders/:id", HttpMethod.PUT, updateOrderUsecase);
    };

    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const { number, local, price, contact } = req.body;

            await this.updateOrderUsecase.execute({ id, number, local, price, contact });
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
            LoggerMiddleware()
        ];
    };
};