import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { CreateOrderUsecase } from "../../../../../usecases/order/create.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { createOrderSchema, findUserIdSchema } from "../../../../../validators/order.schemas";




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
            } =req.body;

            const input = createOrderSchema.parse({
                number,
                local,
                schedulingDate,
                schedulingTime,
                price,
                contact,

            });

            await this.createOrderUsecase.execute({
                userId,
                number:input.number,
                local:input.local,
                schedulingDate:input.schedulingDate,
                schedulingTime:input.schedulingTime,
                price:input.price,
                contact:input.contact,
            });

            return res.status(201).send();
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
            ValidateData(createOrderSchema, "body"),
            ValidateData(findUserIdSchema, "params")
        ];
    };
};