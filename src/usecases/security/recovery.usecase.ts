import { SecurityInterface } from "../../domain/interfaces/security.interface";
import generateHashPattern from "../../patterns/libs/generate-hash.pattern";
import { Usecase } from "../usecase.core";




export type SecurityRecoveryInputDto = {
    id: string;
};

export type SecurityRecoveryOutputDto = {
    password: string;
};


export class SecuityRecoveryUsecase implements Usecase<SecurityRecoveryInputDto, SecurityRecoveryOutputDto> {
    private constructor(private readonly securityIterface: SecurityInterface) {};

    public static build(securityIterface: SecurityInterface) {
        return new SecuityRecoveryUsecase(securityIterface);
    }
    
    public async execute(input: SecurityRecoveryInputDto): Promise<SecurityRecoveryOutputDto> {
        const { id } = input;
        const updatedAt = new Date();

        const passwordRandon = Math.random().toString(30).slice(-10);
        const passwordHashed = await generateHashPattern.generate(passwordRandon);

        await this.securityIterface.recovery(id, passwordHashed, updatedAt);
        
        return {
            password: passwordRandon
        };
    };
};