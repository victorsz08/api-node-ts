import {
  FindUserInputDto,
  FindUserUsecase,
} from "./../../../../../usecases/user/find.usecase";
import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";

type T = any;

export class FindUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findUserUsecase: FindUserUsecase
  ) {}

  public static build(findUserUsecase: FindUserUsecase) {
    return new FindUserRoute("/users/:id", HttpMethod.GET, findUserUsecase);
  }

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const input: FindUserInputDto = req.params as T;
      const response = await this.findUserUsecase.execute(input);

      res.status(200).json(response);
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
