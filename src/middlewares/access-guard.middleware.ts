import { NextFunction, Request, Response } from "express";
import { RoleEnum } from "../domain/enum/role.enum";
import { decode, verify } from "jsonwebtoken";
import { config } from "../../prisma/config";


export type PayloadDataType = {
    id: string;
    role: RoleEnum;
    iat: number;
    exp: number;
}


export function AccessGuard(role: RoleEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["nt.authtoken"]?.token;
        
        try {
            verify(token, config.secret);
            const payload = decode(token) as PayloadDataType;

            if(payload.role !== role) {
                return res.status(401).json({ message: "acesso não autorizado" });
            };

            next();
        } catch (error) {
            return res.status(401).json({ message: "unauthorized" });
        };
    };
};