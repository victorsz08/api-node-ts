import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import {
  CreateUserInputDto,
  CreateUserUsecase,
} from "../../../../../usecases/user/create.usecase";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";
import { AccessGuard } from "../../../../../middlewares/access-guard.middleware";
import { RoleEnum } from "../../../../../domain/enum/role.enum";

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserUsecase: CreateUserUsecase
  ) {}

  public static build(createUserUsecase: CreateUserUsecase) {
    return new CreateUserRoute("/users", HttpMethod.POST, createUserUsecase);
  };

  public getHandler(): (req: Request, res: Response) => Promise<T> {
    return async (req: Request, res: Response) => {
      const input: CreateUserInputDto = req.body;
      await this.createUserUsecase.execute(input);

      return res.status(201).send();
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
      AccessGuard(RoleEnum.ADMIN)
    ];
  }
}
