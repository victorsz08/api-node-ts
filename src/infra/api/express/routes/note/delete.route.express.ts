import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { DeleteNoteUsecase } from "../../../../../usecases/note/delete.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";



export class DeleteNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteNoteUsecase: DeleteNoteUsecase
    ) {};

    public static build(deleteNoteUsecase: DeleteNoteUsecase) {
        return new DeleteNoteRoute("/notes/:id", HttpMethod.DELETE, deleteNoteUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            await this.deleteNoteUsecase.execute({ id });
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
            LoggerMiddleware()
        ];
    };
};