import { UserInterface } from './../../domain/interfaces/user.interface';
import { Usecase } from "../usecase.core";
import { HttpException } from '../../package/http-exceptions/http-exception';
import { HttpStatus } from '../../package/http-exceptions/http-status';



export type DeleteUserInputDto = {
    id: string;
};

export type DeleteUserOutputDto = void;



export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {};
    
    public async execute(input: DeleteUserInputDto): Promise<void> {
        const { id } = input;
        
        const user = await this.userInterface.find(id);
        
        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        await this.userInterface.delete(id);
        return;
    };
};