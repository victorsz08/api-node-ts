import { ListOrderInputDto, ListOrderUsecase } from './../../../../../usecases/order/list.usecase';
import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { StatusEnum } from '../../../../../domain/enum/status.enum';




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
                createdDateIn: new Date(query.createdDateIn),
                createdDateOut: new Date(query.createdDateOut),
                schedulingDateIn: new Date(query.schedulingDateIn),
                schedulingDateOut: new Date(query.schedulingDateOut),
                status: query.status as StatusEnum
            };

            const response = await this.listOrderUsecase.execute(input);
            return res.status(200).json(response);
        };
    };

    getPath(): string {
        throw new Error("Method not implemented.");
    }
    getMethod(): HttpMethod {
        throw new Error("Method not implemented.");
    }
    getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] {
        throw new Error("Method not implemented.");
    }
};