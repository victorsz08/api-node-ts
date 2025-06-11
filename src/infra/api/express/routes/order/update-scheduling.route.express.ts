import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { UpdateSchedulingOrderInputDto, UpdateSchedulingOrderUsecase } from "../../../../../usecases/order/update-scheduling.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findOrderSchema, updateSchedulingSchema } from "../../../../../validators/order.schemas";
import { UpdateNoteInputDto } from "../../../../../usecases/note/update.usecase";




export class UpdateSchedulingOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateSchedulingOrderUsecase: UpdateSchedulingOrderUsecase 
    ) {};

    public static build(updateSchedulingOrderUsecase: UpdateSchedulingOrderUsecase) {
        return new UpdateSchedulingOrderRoute("/orders/scheduling/:id", HttpMethod.PUT, updateSchedulingOrderUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const { schedulingDate, schedulingTime } = req.body;

            const schema = updateSchedulingSchema.parse({ schedulingDate, schedulingTime });

            await this.updateSchedulingOrderUsecase.execute({ id, ...schema});
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
            ValidateData(findOrderSchema, "params"),
            ValidateData(updateSchedulingSchema, "body")
        ];
    };
};