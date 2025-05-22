import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import {
  ListUserInputDto,
  ListUserUsecase,
} from "../../../../../usecases/user/list.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { ValidateData } from "../../../../../middlewares/validate-data.middleware";
import { listUserSchema } from "../../../../../validators/user.schema";
import { z } from "zod";

type T = any;
type ListUserInput = z.infer<typeof listUserSchema>

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
      const input = listUserSchema.parse(query)

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
  ) => Promise<T>)[] {
    return [
      LoggerMiddleware(),
      ValidateData(listUserSchema, "query")
    ]
  }
}
