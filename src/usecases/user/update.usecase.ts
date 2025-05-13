import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../package/http-exceptions/http-status";
import { Usecase } from "../usecase.core";



export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};


export type UpdateUserOutputDto = void;


export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {};

     public static build(userInterface: UserInterface) {
        return new UpdateUserUsecase(userInterface);
    };
    
    public async execute(input: UpdateUserInputDto): Promise<void> {
        const { id, username, firstName, lastName } = input;
        const updatedAt = new Date();
        const user = await this.userInterface.find(id);

        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        await this.userInterface.update(id, username, firstName, lastName, updatedAt);
        return;
    };
};