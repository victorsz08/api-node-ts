import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import {
  ListUserInputDto,
  ListUserUsecase,
} from "../../../../../usecases/user/list.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";

type T = any;

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserUsecase: ListUserUsecase
  ) {}

  public static build(listUserUsecase: ListUserUsecase) {
    return new ListUserRoute("/users", HttpMethod.GET, listUserUsecase);
  }

  public getHandler(): (req: Request, res: Response) => Promise<T> {
    return async (req: Request, res: Response) => {
      const query = req.query as T;
      const input: ListUserInputDto = {
        page: parseInt(query.page),
        limit: parseInt(query.limit),
        search: query.search && query.search.toString()
      };
      
      console.log(input);

      const response = await this.listUserUsecase.execute(input);

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
  ) => Promise<void>)[] {
    return [
      LoggerMiddleware()
    ]
  }
}
