import { Prisma, PrismaClient } from "@prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";
import {
  ListUserInput,
  ListUserOutput,
  UserInterface,
} from "../../domain/interfaces/user.interface";
import userMapper from "../../patterns/mappers/user.mapper";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../package/http-exceptions/http-status";

export class UserRepository implements UserInterface {
  private constructor(private readonly repository: PrismaClient) {}

  public static build(repository: PrismaClient) {
    return new UserRepository(repository);
  }

  public async create(user: UserEntity): Promise<void> {
    const data = userMapper.toEntity(user);

    await this.repository.user.create({
      data,
    });
    return;
  }

  public async find(id: string): Promise<UserEntity> {
    const user = await this.repository.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(
        "usuário não encontrado com esse id",
        HttpStatus.NOT_FOUND
      );
    }

    const output = userMapper.toDto(user);
    return output;
  }

  public async list(query: ListUserInput): Promise<ListUserOutput> {
    const { page, limit, search } = query;

    const queryArgs: Prisma.UserFindManyArgs = {
      where: {},
      take: limit,
      skip: (page - 1) * limit,
    };

    const countArgs: Prisma.UserCountArgs = {
      where: {},
    };

    if (search) {
      queryArgs.where = {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
          { lastname: { contains: search, mode: "insensitive" } },
        ],
      };

      countArgs.where = {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
          { lastname: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const [users, total] = await this.repository.$transaction([
      this.repository.user.findMany(queryArgs),
      this.repository.user.count(countArgs),
    ]);

    const pages = Math.ceil(total / limit);
    const userList = users.map((user) => userMapper.toDto(user));

    return {
      users: userList,
      total,
      pages,
      limit,
    };
  }

  public async update(
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    updatedAt: Date
  ): Promise<void> {
    await this.repository.user.update({
      where: {
        id,
      },
      data: {
        username,
        name: firstName,
        lastname: lastName,
        updatedAt,
      },
    });

    return;
  }

  public async updatePassword(
    id: string,
    password: string,
    updatedAt: Date
  ): Promise<void> {
    await this.repository.user.update({
      where: {
        id,
      },
      data: {
        password,
        updatedAt,
      },
    });

    return;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.user.delete({
      where: {
        id,
      },
    });

    return;
  }
}
