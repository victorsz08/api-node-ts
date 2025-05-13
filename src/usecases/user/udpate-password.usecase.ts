import { UserInterface } from './../../domain/interfaces/user.interface';
import { Usecase } from "../usecase.core";
import generateHashPattern from '../../patterns/libs/generate-hash.pattern';
import { HttpException } from '../../package/http-exceptions/http-exception';
import { HttpStatus } from '../../package/http-exceptions/http-status';




export type UpdatePasswordUserInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string;
};

export type UpdatePasswordUserOutputDto = void;


export class UpdatePasswordUserUsecase implements Usecase<UpdatePasswordUserInputDto, UpdatePasswordUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {};

     public static build(userInterface: UserInterface) {
        return new UpdatePasswordUserUsecase(userInterface);
    };
    
    
    public async execute(input: UpdatePasswordUserInputDto): Promise<void> {
      const { id, currentPassword, newPassword } = input;
      const updatedAt = new Date();

      const user = await this.userInterface.find(id);
      const validatePassword = await generateHashPattern.compareHash(currentPassword, user.password);
      
      if(!validatePassword) {
        throw new HttpException("senha atual incorreta", HttpStatus.BAD_REQUEST);
      };

      const newPasswordHash = await generateHashPattern.generate(newPassword);

      await this.userInterface.updatePassword(id, newPasswordHash, updatedAt);
      return;
    };
};