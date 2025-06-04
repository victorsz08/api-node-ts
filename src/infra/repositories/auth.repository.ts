import { PrismaClient } from "@prisma/client";
import { AuthInterface } from "../../domain/interfaces/auth.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { HttpStatus } from "../../package/http-exceptions/http-status";
import generateHashPattern from "../../patterns/libs/generate-hash.pattern";
import { sign } from "jsonwebtoken";
import { config } from "../../../prisma/config";



export class AuthRepository implements AuthInterface {
    private constructor(private readonly repository: PrismaClient) {};
    
    public static build(repository: PrismaClient) {
        return new AuthRepository(repository);
    };

    public async login(username: string, password: string): Promise<string> {
        const user = await this.repository.user.findUnique({ where: { username }});

        if(!user) {
            throw new HttpException("usuário ou senha incorretos", HttpStatus.BAD_REQUEST);
        };

        const validatePassword = await generateHashPattern.compareHash(password, user.password);

        if(!validatePassword) {
            throw new HttpException("usuário ou senha incorretos", HttpStatus.BAD_REQUEST);
        };

        const payload = sign({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role
        }, config.secret, { expiresIn: "1d" });
        
        return payload;
    };
};