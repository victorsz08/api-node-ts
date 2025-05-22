import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { UpdateNoteUsecase } from "../../../../../usecases/note/update.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findNoteSchema, updateNoteSchema } from "../../../../../validators/note.schema";



export class UpdateNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateNoteUsecase: UpdateNoteUsecase
    ) {};

    public static build(updateNoteUsecase: UpdateNoteUsecase) {
        return new UpdateNoteRoute("/notes/:id", HttpMethod.PUT, updateNoteUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const { content } = req.body;

            await this.updateNoteUsecase.execute({ id, content });
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
            ValidateData(findNoteSchema, "params"),
            ValidateData(updateNoteSchema, "body")
        ];
    };
};