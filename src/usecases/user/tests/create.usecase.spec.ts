import { UserInterface } from "../../../domain/interfaces/user.interface";
import { UserRepository } from "../../../infra/repositories/user.repository.prisma";
import { HttpException } from "../../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../../package/http-exceptions/http-status";
import { prisma } from "../../../package/prisma/prisma.service";
import generateHashPattern from "../../../patterns/libs/generate-hash.pattern";
import { CreateUserInputDto, CreateUserUsecase } from "../create.usecase";

describe("create user usecase", () => {
  let mockUserInterface: jest.Mocked<UserInterface>;
  let createUserUsecase: CreateUserUsecase;

  beforeEach(() => {
    mockUserInterface = {
      create: jest.fn(),
      find: jest.fn(),
      list: jest.fn(),
      update: jest.fn(),
      updatePassword: jest.fn(),
      delete: jest.fn(),
    };

    createUserUsecase = CreateUserUsecase.build(mockUserInterface);
  });

  test("should a be create new user successfully", async () => {
    const user: CreateUserInputDto = {
      username: "jonh.doe",
      firstName: "jonh",
      lastName: "doe",
      password: "123456789",
    };

    await createUserUsecase.execute(user);

    expect(mockUserInterface.create).toHaveBeenCalled();
    expect(mockUserInterface.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    );
  });

  test("should a be encrypt password successfully", async () => {
    const user: CreateUserInputDto = {
      username: "jane.doe",
      firstName: "Jane",
      lastName: "Doe",
      password: "mypassword",
    };

    await createUserUsecase.execute(user);

    const createdUser = mockUserInterface.create.mock.calls[0][0];

    expect(createdUser.password).not.toBe(user.password);

    const isPasswordValid = await generateHashPattern.compareHash(
      user.password,
      createdUser.password
    );
    expect(isPasswordValid).toBe(true);
  });

  test("should a be username already exists", async () => {
    const user: CreateUserInputDto = {
      username: "jane.doe",
      firstName: "Jane",
      lastName: "Doe",
      password: "mypassword",
    };

    mockUserInterface.create.mockImplementation(() => {
        throw new HttpException("username indisponivel", HttpStatus.CONFLICT);
    });

    await expect(createUserUsecase.execute(user)).rejects.toThrow(HttpException);
    await expect(createUserUsecase.execute(user)).rejects.toThrow("username indisponivel");
  })
});
