import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { UpdatePasswordUserUsecase } from "../../../../../usecases/user/udpate-password.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findUserSchema, updatePasswordSchema } from "../../../../../validators/user.schema";

export class UpdatePasswordUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updatePasswordUserUsecase: UpdatePasswordUserUsecase
  ) {}

  public static build(updatePasswordUserUsecase: UpdatePasswordUserUsecase) {
    return new UpdatePasswordUserRoute(
      "/users/password/:id",
      HttpMethod.PUT,
      updatePasswordUserUsecase
    );
  }

  public getHandler(): (req: Request, res: Response) => Promise<T> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      await this.updatePasswordUserUsecase.execute({
        id,
        currentPassword,
        newPassword,
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
  ) => Promise<T>)[] {
    return [
      LoggerMiddleware(),
      ValidateData(findUserSchema, "params"),
      ValidateData(updatePasswordSchema, "body")
    ]
  }
}
