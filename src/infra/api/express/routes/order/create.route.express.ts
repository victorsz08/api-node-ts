import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { CreateOrderInputDto, CreateOrderUsecase } from "../../../../../usecases/order/create.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";




export class CreateOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createOrderUsecase: CreateOrderUsecase
    ) {};

    public static build(createOrderUsecase: CreateOrderUsecase) {
        return new CreateOrderRoute("/orders/:userId", HttpMethod.POST, createOrderUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { userId } = req.params;
            const { 
                number, 
                local, 
                schedulingDate, 
                schedulingTime, 
                price, 
                contact 
            } = req.body as CreateOrderInputDto;

            await this.createOrderUsecase.execute({ 
                number, 
                local, 
                schedulingDate, 
                schedulingTime, 
                price, 
                contact, 
                userId 
            });

            return res.status(201).send();
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] {
        return [
            LoggerMiddleware()
        ]
    };
};