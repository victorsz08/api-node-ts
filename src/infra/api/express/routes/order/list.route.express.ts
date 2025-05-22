import { ListOrderInputDto, ListOrderUsecase } from './../../../../../usecases/order/list.usecase';
import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { StatusEnum } from '../../../../../domain/enum/status.enum';
import { LoggerMiddleware } from '../../../../../middlewares/logger.middleware';
import formatDatePattern from '../../../../../patterns/libs/format-date.pattern';
import { ValidateData } from '../../../../../middlewares/validate-data.middleware';
import { listOrderSchema } from '../../../../../validators/order.schemas';
import { listUserSchema } from '../../../../../validators/user.schema';




export class ListOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listOrderUsecase: ListOrderUsecase
    ) {};

    public static build(listOrderUsecase: ListOrderUsecase) {
        return new ListOrderRoute("/orders", HttpMethod.GET, listOrderUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const query = req.query as T;
            
            const input = listOrderSchema.parse(query);

            const response = await this.listOrderUsecase.execute(input);
            return res.status(200).json(response);
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<any>)[] {
        return [
            LoggerMiddleware(),
            ValidateData(listOrderSchema, "query")
        ]
    };
};