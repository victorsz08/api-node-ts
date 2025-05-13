import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { DeleteUserUsecase } from "../../../../../usecases/user/delete.usecase";

export class DeleteUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteUserUsecase: DeleteUserUsecase
  ) {}

  public static build(deleteUserUsecase: DeleteUserUsecase) {
    return new DeleteUserRoute(
      "/users/:id",
      HttpMethod.DELETE,
      deleteUserUsecase
    );
  }

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      await this.deleteUserUsecase.execute({ id });
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
    throw new Error("Method not implemented.");
  }
}
