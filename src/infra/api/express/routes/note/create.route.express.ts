import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { CreateNoteUsecase } from "../../../../../usecases/note/create.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";




export class CreateNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createNoteUsecase: CreateNoteUsecase
    ) {};

    public static build(createNoteUsecase: CreateNoteUsecase) {
        return new CreateNoteRoute("/notes/:userId", HttpMethod.POST, createNoteUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const { userId } = req.params;
            const { content } = req.body;

            await this.createNoteUsecase.execute({ content, userId });
            return res.status(201).send();
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