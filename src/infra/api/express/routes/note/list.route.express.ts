import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { ListNoteInputDto, ListNoteUsecase } from "../../../../../usecases/note/list.usecase";
import formatDatePattern from "../../../../../patterns/libs/format-date.pattern";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { listNoteSchema } from "../../../../../validators/note.schema";
import { listOrderSchema } from "../../../../../validators/order.schemas";




export class ListNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listNoteUsecase: ListNoteUsecase
    ) {};
    
    public static build(listNoteUsecase: ListNoteUsecase) {
        return new ListNoteRoute("/notes", HttpMethod.GET, listNoteUsecase);
    };

    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) =>  {
            const query = req.query as T;
            const input = listNoteSchema.parse(query);

            const data = await this.listNoteUsecase.execute(input);

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
            LoggerMiddleware(),
            ValidateData(listNoteSchema, "query")
        ];
    };
};