import { RoleEnum } from "../../domain/enum/role.enum";
import { SecurityInterface } from "../../domain/interfaces/security.interface";
import { Usecase } from "../usecase.core";




export type GrantedUserInputDto = {
    id: string;
    role: RoleEnum;
};

export type GrantedUserOutputDto = void;



export class GrantedUserUsecase implements Usecase<GrantedUserInputDto, GrantedUserOutputDto> {
    private constructor(private readonly securityInterface: SecurityInterface) {};

    public static build(securityInterface: SecurityInterface) {
        return new GrantedUserUsecase(securityInterface);
    };
    
    public async execute(input: GrantedUserInputDto): Promise<void> {
        const { id, role } = input;
        const updatedAt = new Date();

        await this.securityInterface.grantedUser(id, role, updatedAt);
        return;
    };
};