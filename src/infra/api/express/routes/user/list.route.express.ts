import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import {
  ListUserInputDto,
  ListUserUsecase,
} from "../../../../../usecases/user/list.usecase";

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

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const input: ListUserInputDto = req.query as T;
      const response = await this.listUserUsecase.execute(input);

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
    throw new Error("Method not implemented.");
  }
}
