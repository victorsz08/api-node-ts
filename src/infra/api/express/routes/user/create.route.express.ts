import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import {
  CreateUserInputDto,
  CreateUserUsecase,
} from "../../../../../usecases/user/create.usecase";

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserUsecase: CreateUserUsecase
  ) {}

  public static build(createUserUsecase: CreateUserUsecase) {
    return new CreateUserRoute("/users", HttpMethod.POST, createUserUsecase);
  };

  public getHandler(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const input: CreateUserInputDto = req.body;
      await this.createUserUsecase.execute(input);

      res.status(201).send();
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
    return [];
  }
}
