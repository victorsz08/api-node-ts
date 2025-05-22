import { z } from "zod";
import { RoleEnum } from "../domain/enum/role.enum";



export const grantedUserSchema = z.object({
    role: z.string().min(1, { message: "o campo novo cargo é obrigatório" }).transform((value) => {
        return value as RoleEnum
    })
});