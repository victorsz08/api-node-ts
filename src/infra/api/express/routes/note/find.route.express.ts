import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { FindNoteUsecase } from "../../../../../usecases/note/find.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findNoteSchema } from "../../../../../validators/note.schema";



export class FindNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findNoteUsecase: FindNoteUsecase
    ) {};

    public static build(findNoteUsecase: FindNoteUsecase) {
        return new FindNoteRoute("/notes/:id", HttpMethod.GET, findNoteUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const note = await this.findNoteUsecase.execute({ id });

            return res.status(200).json(note);
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
            ValidateData(findNoteSchema, "params")
        ]
    };
};