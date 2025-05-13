import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { Usecase } from "../usecase.core";




export type CreateUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type CreateUserOutputDto = void;


export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {}
    
    public async execute(input: CreateUserInputDto): Promise<void> {
        const { username, firstName, lastName, password } = input;
        const user = await UserEntity.build(username, firstName, lastName, password);

        await this.userInterface.create(user);
        return;
    };
};