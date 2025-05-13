import { UserEntity } from "../../domain/entities/user.entity";
import { RoleEnum } from "../../domain/enum/role.enum";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../package/http-exceptions/http-status";
import userMapper from "../../patterns/mappers/user.mapper";
import { Usecase } from "../usecase.core";




export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};


export class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {};
    
    public async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const { id } = input;
        const user = await this.userInterface.find(id);
        
        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        const output = userMapper.toOutputDto(user);

        return output;
    };
};