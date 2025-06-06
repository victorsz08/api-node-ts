import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { GetSalesPerDayUsecase } from "../../../../../usecases/insight/sales-per-day.usecase";
import { getInsightSchema } from "../../../../../validators/insight.schema";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";





export class GetSalesPerDayRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getSalesPerDayUsecase: GetSalesPerDayUsecase
    ) {};

    public static build(getSalesPerDayUsecase: GetSalesPerDayUsecase) {
        return new GetSalesPerDayRoute("/insights/sales-per-day", HttpMethod.GET, getSalesPerDayUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { userId, dateIn, dateOut } = req.query;
            const input = getInsightSchema.parse({ userId, dateIn, dateOut });

            const response = await this.getSalesPerDayUsecase.execute(input);
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