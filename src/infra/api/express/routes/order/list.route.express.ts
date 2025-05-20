import { ListOrderInputDto, ListOrderUsecase } from './../../../../../usecases/order/list.usecase';
import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { StatusEnum } from '../../../../../domain/enum/status.enum';
import { LoggerMiddleware } from '../../../../../middlewares/logger.middleware';
import { endOfDay, startOfDay } from 'date-fns';
import formatDatePattern from '../../../../../patterns/libs/format-date.pattern';




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
            const query = req.query as any;
            
            const input: ListOrderInputDto = {
                page: parseInt(query.page),
                limit: parseInt(query.limit),
                userId: query.userId.toString(),
                createdDateIn: query.createdDateIn && formatDatePattern.startOfDate(query.createdDateIn),
                createdDateOut: query.createdDateOut && formatDatePattern.endOfDate(query.createdDateOut),
                schedulingDateIn: query.schedulingDateIn  && formatDatePattern.startOfDate(query.schedulingDateIn),
                schedulingDateOut: query.schedulingDateOut  &&  formatDatePattern.endOfDate(query.schedulingDateOut),
                status: query.status && query.status as StatusEnum
            };

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

    public getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] {
        return [
            LoggerMiddleware()
        ]
    };
};