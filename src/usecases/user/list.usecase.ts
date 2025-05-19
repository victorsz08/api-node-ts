import { ListUserOutput, UserInterface } from "../../domain/interfaces/user.interface";
import userMapper from "../../patterns/mappers/user.mapper";
import { Usecase } from "../usecase.core";



export type ListUserInputDto = {
    page: number;
    limit: number;
    search?: string;
};

export type ListUserOutputDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    }[];
    total: number;
    pages: number;
    limit: number;
};


export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {};

     public static build(userInterface: UserInterface) {
        return new ListUserUsecase(userInterface);
    };
    
    
    public async execute(input: ListUserInputDto): Promise<ListUserOutputDto> {
        const { page, limit, search } = input;

        const data = await this.userInterface.list({ page, limit, search });
        const output = this.present(data);

        return output;
    };

    private present(data: ListUserOutput): ListUserOutputDto {
        return {
            users: data.users.map((user) => {
                return userMapper.toDto(user)
            }),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    };
};