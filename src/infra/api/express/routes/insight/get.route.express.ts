import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { GetInsightInputDto, GetInsightUsecase } from "../../../../../usecases/insight/get.usecase";
import formatDatePattern from "../../../../../patterns/libs/format-date.pattern";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";




export class GetInsightRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getInsightUsecase: GetInsightUsecase
    ) {};

    public static build(getInsightUsecase: GetInsightUsecase) {
        return new GetInsightRoute("/insights", HttpMethod.GET, getInsightUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { userId, dateIn, dateOut } = req.query as T;
            const input: GetInsightInputDto = {
                userId: userId.toString(),
                dateIn: formatDatePattern.startOfDate(dateIn),
                dateOut: formatDatePattern.endOfDate(dateOut)
            };

            const data = await this.getInsightUsecase.execute(input);
            return res.status(200).json(data);
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
        ]
    };
};