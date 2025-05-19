import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { FindOrderUsecase } from "../../../../../usecases/order/find.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";



export class FindOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findOrderUsecase: FindOrderUsecase
    ) {};

    public static build(findOrderUsecase: FindOrderUsecase) {
        return new FindOrderRoute("/orders/:id", HttpMethod.GET, findOrderUsecase);
    };

    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const response = await this.findOrderUsecase.execute({ id });

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
            LoggerMiddleware()
        ];
    };
};