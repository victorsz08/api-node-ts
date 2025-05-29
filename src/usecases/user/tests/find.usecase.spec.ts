import { UserEntity, UserType } from "../../../domain/entities/user.entity";
import { RoleEnum } from "../../../domain/enum/role.enum";
import { UserInterface } from "../../../domain/interfaces/user.interface";
import { HttpException } from "../../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../../package/http-exceptions/http-status";
import formatDatePattern from "../../../patterns/libs/format-date.pattern";
import userMapper from "../../../patterns/mappers/user.mapper";
import { FindUserInputDto, FindUserOutputDto, FindUserUsecase } from "../find.usecase";



describe("find user usecase", () => {
    let mockUserInterface: jest.Mocked<UserInterface>;
    let findUserUsecase: FindUserUsecase;

    beforeEach(() => {
        mockUserInterface = {
            create: jest.fn(),
            find: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
            updatePassword: jest.fn(),
            delete: jest.fn(),
        };

        findUserUsecase = FindUserUsecase.build(mockUserInterface);
    });

    test("should a be find user successfully", async () => {
        const input: FindUserInputDto = {
            id: "123456789"
        };

        const userData = {
            id: "123456789",
            username: "jonh.doe",
            firstName: "jonh",
            lastName: "doe",
            role: RoleEnum.ADMIN,
            password: "123456789",
            createdAt: new Date(),
            updatedAt: new Date()
        } as UserEntity;

        mockUserInterface.find.mockResolvedValue(userData);

        const dataExpected = userMapper.toDto(userData);
        const result = await findUserUsecase.execute(input);

        expect(result).toEqual(dataExpected);
        expect(mockUserInterface.find).toHaveBeenCalledWith(input.id);
    });

    test("should a be user not found with id", async () => {
        const input: FindUserInputDto = {
            id: "123456789"
        };

        mockUserInterface.find.mockImplementation(() => {
            throw new HttpException("usuario não encontrado com esse id", HttpStatus.NOT_FOUND);
        });

        expect(findUserUsecase.execute(input)).rejects.toThrow(HttpException);
        expect(findUserUsecase.execute(input)).rejects.toThrow("usuario não encontrado com esse id");
    });
});