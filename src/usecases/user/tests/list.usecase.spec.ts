import { UserEntity } from "../../../domain/entities/user.entity";
import { RoleEnum } from "../../../domain/enum/role.enum";
import { UserInterface } from "../../../domain/interfaces/user.interface";
import userMapper from "../../../patterns/mappers/user.mapper";
import { ListUserInputDto, ListUserUsecase } from "../list.usecase";

describe("list user usecase", () => {
  let mockUserInterface: jest.Mocked<UserInterface>;
  let listUserUsecase: ListUserUsecase;

  beforeEach(() => {
    mockUserInterface = {
      create: jest.fn(),
      find: jest.fn(),
      list: jest.fn(),
      update: jest.fn(),
      updatePassword: jest.fn(),
      delete: jest.fn(),
    };

    listUserUsecase = ListUserUsecase.build(mockUserInterface);
  });

  test("should a be list user successfully", async () => {
    const input: ListUserInputDto = {
      page: 1,
      limit: 10,
      search: "vic",
    };

    const userList = {
      users: [
        {
          id: "123456789",
          username: "jonh.doe",
          firstName: "jonh",
          lastName: "doe",
          role: RoleEnum.USER,
          password: "123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
        } as UserEntity,
      ],
      total: 10,
      pages: 1,
      limit: 10
    };

    mockUserInterface.list.mockResolvedValue(userList);
    const dataExpected = {
        users: userList.users.map((user) => {
            return userMapper.toDto(user)
        }),
        total: userList.total,
        pages: userList.pages,
        limit: userList.limit
    };

    const result = await listUserUsecase.execute(input);

    expect(result).toEqual(dataExpected);
    expect(mockUserInterface.list).toHaveBeenCalledWith(input);
  });
});
