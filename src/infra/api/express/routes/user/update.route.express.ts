import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateUserUsecase } from "../../../../../usecases/user/update.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";

export class UpdateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateUserUsecase: UpdateUserUsecase
  ) {}

  public static build(updateUserUsecase: UpdateUserUsecase) {
    return new UpdateUserRoute("/users/:id", HttpMethod.PUT, updateUserUsecase);
  }

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const { username, firstName, lastName } = req.body;

      await this.updateUserUsecase.execute({
        id,
        username,
        firstName,
        lastName,
      });
      res.status(204).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getMiddlewares?(): ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>)[] {
    return [
      LoggerMiddleware()
    ]
  }
}
