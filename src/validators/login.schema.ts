import { z } from "zod";



export const authLoginSchema = z.object({
    username: z.string().min(1, { message: "o campo username é obrigatório" }),
    password: z.string().min(1, { message: "o campo senha é obrigatório" })
});