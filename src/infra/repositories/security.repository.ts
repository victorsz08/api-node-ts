import { PrismaClient } from "@prisma/client";
import { RoleEnum } from "../../domain/enum/role.enum";
import { SecurityInterface } from "../../domain/interfaces/security.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../package/http-exceptions/http-status";




export class SecurityRepository implements SecurityInterface {
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new SecurityRepository(repository);
    };
    
    public async recovery(id: string, password: string, updatedAt: Date): Promise<void> {
        const user = await this.repository.user.findUnique({ where: { id }});

        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.BAD_REQUEST);
        };

        await this.repository.user.update({
            where: { id },
            data: {
                password,
                updatedAt
            }
        });

        return;
    };

    public async grantedUser(id: string, role: RoleEnum, updatedAt: Date): Promise<void> {
        const user = await this.repository.user.findUnique({ where: { id }});

        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.BAD_REQUEST);
        };

        await this.repository.user.update({
            where: { id },
            data: {
                role,
                updatedAt
            }
        });

        return;
    }
};