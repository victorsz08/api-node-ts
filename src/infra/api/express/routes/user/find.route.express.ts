import {
  FindUserUsecase,
} from "./../../../../../usecases/user/find.usecase";
import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { findUserSchema } from "../../../../../validators/user.schema";


export class FindUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findUserUsecase: FindUserUsecase
  ) {}

  public static build(findUserUsecase: FindUserUsecase) {
    return new FindUserRoute("/users/:id", HttpMethod.GET, findUserUsecase);
  }

  public getHandler(): (req: Request, res: Response) => Promise<T> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const response = await this.findUserUsecase.execute({ id });

      return res.status(200).json(response);
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
      ValidateData(findUserSchema, "params")
    ]
  }
}
